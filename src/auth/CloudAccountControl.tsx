import { useState } from 'react';
import { useAuth } from './AuthProvider';

const statusLabels = {
  unconfigured: 'Nuvem a configurar',
  'signed-out': 'Entre para sincronizar',
  syncing: 'Sincronizando…',
  synced: 'Sincronizado',
  offline: 'Aguardando internet',
  error: 'Sincronização pausada',
};

export function CloudAccountControl() {
  const { configured, loading, user, status, message, authError, signInGoogle, signOut } = useAuth();
  const [busy, setBusy] = useState(false);
  const [localError, setLocalError] = useState('');

  async function handleSignIn() {
    setBusy(true); setLocalError('');
    try { await signInGoogle(); }
    catch (error) { setLocalError(error instanceof Error ? error.message : 'Não foi possível abrir o login.'); }
    finally { setBusy(false); }
  }

  async function handleSignOut() {
    setBusy(true); setLocalError('');
    try { await signOut(); }
    catch (error) { setLocalError(error instanceof Error ? error.message : 'Não foi possível sair da conta.'); }
    finally { setBusy(false); }
  }

  return <div className={`cloud-account-control cloud-${status}`} title={message}>
    <span className="cloud-status-dot" aria-hidden="true" />
    <span className="cloud-status-copy"><strong>{statusLabels[status]}</strong><small>{user?.displayName || user?.email || (configured ? 'Progresso deste navegador' : 'Configuração pendente')}</small></span>
    {user
      ? <button type="button" className="cloud-account-action" disabled={busy || loading || status === 'syncing' || status === 'offline' || status === 'error'} onClick={() => void handleSignOut()}>{busy || status === 'syncing' ? 'Aguarde…' : 'Sair'}</button>
      : <button type="button" className="cloud-account-action cloud-login-action" disabled={!configured || loading || busy} onClick={() => void handleSignIn()}>{loading || busy ? 'Aguarde…' : 'Entrar com Google'}</button>}
    {(localError || authError || status === 'error') && <span className="cloud-account-error" role="status">{localError || authError || message}</span>}
  </div>;
}
