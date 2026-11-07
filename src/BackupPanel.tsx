import { useRef, useState } from 'react';
import { getProgramBackupKeys, getStudyProgram, studyPrograms, PYTHON_BACKUP_KEY, PYTHON_STATE_KEY } from './data/studyPrograms';
import { applyStorageTransaction, getBrowserStorage, readStoredValue, validateBackupEntries } from './data/storage.js';

type BackupFile = { app: string; version: number; programId?: string; programTitle?: string; exportedAt?: string; data: Record<string, string | null> };
const LEGACY_TI_KEYS = ['trilha-ti-reviews-v1', 'trilha-ti-practice-v1', 'trilha-ti-route-v1', 'trilha-ti-quiz-v1', 'trilha-ti-plan-v1', 'trilha-ti-recent-course-v1'];
const MAX_BACKUP_BYTES = 10_000_000;

type BackupPanelProps = { programId?: string };

export function BackupPanel({ programId: linkedProgramId }: BackupPanelProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [chosenProgramId, setChosenProgramId] = useState(studyPrograms[0]?.id ?? 'gestao-ti');
  const [notice, setNotice] = useState('');
  const programId = linkedProgramId ?? chosenProgramId;
  const program = getStudyProgram(programId) ?? studyPrograms[0];

  function exportBackup() {
    try {
      if (!getBrowserStorage()) throw new Error('O armazenamento deste navegador está indisponível.');
      const data = Object.fromEntries(getProgramBackupKeys(program).map((key) => [key, readStoredValue(key)]));
      const payload: BackupFile = { app: 'nexo-cursos', version: 2, programId: program.id, programTitle: program.title, exportedAt: new Date().toISOString(), data };
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `backup-nexo-${program.id}-${new Date().toISOString().slice(0, 10)}.json`;
      link.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      setNotice(`Backup de “${program.title}” baixado. Ele inclui o calendário e o progresso deste curso.`);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Não foi possível preparar o backup neste navegador.');
    }
  }

  async function importBackup(file?: File) {
    if (!file) return;
    try {
      if (file.size > MAX_BACKUP_BYTES) throw new Error('Arquivo muito grande.');
      const parsed = JSON.parse(await file.text()) as BackupFile & Record<string, unknown>;

      // Compatibilidade com o arquivo bruto exportado pela versão embarcada de Python.
      if (program.id === 'python-profissional' && parsed.version === 2 && Number.isFinite(parsed.xp) && parsed.competencies && Array.isArray(parsed.srsCards)) {
        const serialized = JSON.stringify(parsed);
        if (!window.confirm('Restaurar este progresso de Python vai substituir o estado atual do curso neste navegador. O calendário existente será preservado. Continuar?')) return;
        const storage = getBrowserStorage();
        const entries = validateBackupEntries({ [PYTHON_STATE_KEY]: serialized, [PYTHON_BACKUP_KEY]: serialized }, [PYTHON_STATE_KEY, PYTHON_BACKUP_KEY], MAX_BACKUP_BYTES);
        applyStorageTransaction(storage, entries);
        setNotice('Progresso de Python restaurado. Atualizando o aplicativo...');
        window.setTimeout(() => window.location.reload(), 500);
        return;
      }

      if (!parsed || !['nexo-cursos', 'trilha-ti'].includes(String(parsed.app)) || !parsed.data || typeof parsed.data !== 'object' || Array.isArray(parsed.data)) throw new Error('Arquivo não reconhecido.');
      let targetId = program.id;
      if (parsed.version === 2) {
        if (typeof parsed.programId !== 'string' || !getStudyProgram(parsed.programId)) throw new Error('O arquivo não identifica um curso reconhecido.');
        targetId = parsed.programId;
        if (targetId !== program.id) throw new Error(`Este backup pertence a “${getStudyProgram(targetId)?.title}”. Selecione esse curso no campo antes de restaurar.`);
      } else if (parsed.version === 1 && ['nexo-cursos', 'trilha-ti'].includes(String(parsed.app))) {
        if (program.id !== 'gestao-ti') throw new Error('Este é um backup antigo de Gestão de TI. Selecione esse curso para restaurá-lo.');
      } else throw new Error('Versão de backup não compatível.');

      const target = getStudyProgram(targetId)!;
      const allowedKeys = parsed.version === 1 ? LEGACY_TI_KEYS : getProgramBackupKeys(target);
      const entries = validateBackupEntries(parsed.data, allowedKeys);
      if (!window.confirm(`Restaurar o backup de “${target.title}” substituirá o progresso e o calendário deste curso neste navegador. Os demais cursos serão preservados. Continuar?`)) return;
      applyStorageTransaction(getBrowserStorage(), entries);
      setNotice(`Backup de “${target.title}” restaurado. Atualizando o aplicativo...`);
      window.setTimeout(() => window.location.reload(), 500);
    } catch (error) {
      setNotice(error instanceof Error && (error.message.startsWith('Este backup') || error.message.startsWith('Este é') || error.message.startsWith('O backup') || error.message.startsWith('Um item') || error.message.startsWith('O progresso') || error.message.startsWith('Não foi possível') || error.message.startsWith('A restauração') || error.message.startsWith('Não foi possível gravar') || error.message.startsWith('O armazenamento'))
        ? error.message
        : 'Não consegui ler esse arquivo. Selecione um backup do Nexo Cursos ou o JSON de progresso do curso Python.');
    } finally {
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  return <section className="backup-panel"><div><p className="eyebrow">SEUS DADOS FICAM COM VOCÊ</p><h2>Salvar ou recuperar meu progresso</h2>
    <p>Escolha um curso para exportar ou restaurar seu progresso e calendário. O arquivo é salvo no seu dispositivo e não é enviado para a internet.</p></div>
    <div className="backup-actions">{!linkedProgramId && <label className="backup-course-picker">Curso<select value={program.id} onChange={(event) => { setChosenProgramId(event.target.value); setNotice(''); }} aria-label="Curso do backup">{studyPrograms.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}</select></label>}
      <button className="button-secondary" onClick={exportBackup}>Baixar backup <span>↓</span></button>
      <button className="button-secondary" onClick={() => inputRef.current?.click()}>Restaurar backup <span>↑</span></button>
      <input ref={inputRef} type="file" accept="application/json,.json" hidden onChange={(event) => void importBackup(event.target.files?.[0])} /></div>
    {notice && <p className="backup-notice" role="status">{notice}</p>}
  </section>;
}
