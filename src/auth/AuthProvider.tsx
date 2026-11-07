import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Auth, User } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import { firebaseConfigured, getFirebaseAuth, getFirebaseDb } from './firebase';
import type { CloudProgressStatus } from './progressSync';

type AuthContextValue = {
  configured: boolean;
  loading: boolean;
  user: User | null;
  status: CloudProgressStatus;
  message: string;
  authError: string;
  signInGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function readableAuthError(error: unknown) {
  const code = typeof error === 'object' && error && 'code' in error ? String(error.code) : '';
  if (code.includes('popup-closed-by-user')) return 'A janela de login foi fechada antes de concluir.';
  if (code.includes('unauthorized-domain')) return 'Este domínio ainda não foi autorizado no Firebase Authentication.';
  if (code.includes('operation-not-allowed')) return 'O login Google ainda não foi ativado no Firebase Authentication.';
  if (code.includes('network-request-failed')) return 'Sem conexão. Verifique a internet e tente novamente.';
  if (error instanceof Error) return error.message;
  return 'Não foi possível concluir o login Google.';
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(firebaseConfigured);
  const [status, setStatus] = useState<CloudProgressStatus>(firebaseConfigured ? 'signed-out' : 'unconfigured');
  const [message, setMessage] = useState(firebaseConfigured ? 'Entre com Google para sincronizar entre dispositivos.' : 'Login na nuvem aguardando configuração do Firebase.');
  const [authError, setAuthError] = useState('');
  const [authInstance, setAuthInstance] = useState<Auth | null>(null);
  const [dbInstance, setDbInstance] = useState<Firestore | null>(null);

  useEffect(() => {
    let active = true;
    let unsubscribe: (() => void) | undefined;
    void (async () => {
      try {
        const auth = await getFirebaseAuth();
        if (!active || !auth) { if (active) setLoading(false); return; }
        setAuthInstance(auth);
        const { onAuthStateChanged } = await import('firebase/auth');
        if (!active) return;
        unsubscribe = onAuthStateChanged(auth, (nextUser) => {
          setUser(nextUser);
          setLoading(false);
          setAuthError('');
          if (!nextUser) setStatus('signed-out');
        }, (error) => {
          setLoading(false);
          setStatus('error');
          setMessage(readableAuthError(error));
        });
      } catch (error) {
        if (!active) return;
        setLoading(false);
        setStatus('error');
        setMessage(readableAuthError(error));
      }
    })();
    return () => { active = false; unsubscribe?.(); };
  }, []);

  useEffect(() => {
    if (!user || !authInstance) {
      if (!user) setDbInstance(null);
      if (!firebaseConfigured) setStatus('unconfigured');
      else if (!loading) setStatus('signed-out');
      return;
    }
    let active = true;
    let stop: (() => void) | undefined;
    setStatus('syncing');
    setMessage('Conectando seu progresso à nuvem…');
    void (async () => {
      try {
        const db = await getFirebaseDb();
        if (!active || !db) return;
        setDbInstance(db);
        const { startProgressSync } = await import('./progressSync');
        const unsubscribe = await startProgressSync(db, user.uid, (nextStatus, nextMessage) => {
          if (!active) return;
          setStatus(nextStatus);
          if (nextMessage) setMessage(nextMessage);
        });
        if (active) stop = unsubscribe;
        else unsubscribe();
      } catch (error: unknown) {
        if (!active) return;
        if (error instanceof Error && error.name === 'LocalMigrationCancelledError' && authInstance) {
          setMessage('Nenhum dado foi alterado. Entre novamente quando quiser transferir o progresso deste navegador.');
          const { signOut: firebaseSignOut } = await import('firebase/auth');
          await firebaseSignOut(authInstance).catch(() => undefined);
          return;
        }
        setStatus(navigator.onLine ? 'error' : 'offline');
        setMessage(readableAuthError(error));
      }
    })();
    return () => { active = false; stop?.(); };
  }, [user?.uid, loading, authInstance]);

  const signInGoogle = useCallback(async () => {
    if (!firebaseConfigured) throw new Error('A conexão segura com o Firebase ainda não foi configurada.');
    setAuthError('');
    try {
      const { GoogleAuthProvider, browserLocalPersistence, setPersistence, signInWithPopup } = await import('firebase/auth');
      const auth = await getFirebaseAuth();
      if (!auth) throw new Error('A conexão segura com o Firebase ainda não foi configurada.');
      await setPersistence(auth, browserLocalPersistence);
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      await signInWithPopup(auth, provider);
    } catch (error) {
      const messageText = readableAuthError(error);
      setAuthError(messageText);
      throw new Error(messageText);
    }
  }, []);

  const signOut = useCallback(async () => {
    if (!authInstance || !user) return;
    try {
      if (status !== 'synced') throw new Error('Aguarde a sincronização terminar e tente sair novamente para não deixar progresso pendente.');
      const sync = await import('./progressSync');
      if (dbInstance) await sync.flushUserPendingProgress(dbInstance, user.uid);
      const { signOut: firebaseSignOut } = await import('firebase/auth');
      await firebaseSignOut(authInstance);
      sync.clearLocalProgressCache();
      window.location.reload();
    } catch (error) {
      const messageText = readableAuthError(error);
      setAuthError(messageText);
      throw new Error(messageText);
    }
  }, [user, status, authInstance, dbInstance]);

  const value = useMemo<AuthContextValue>(() => ({
    configured: firebaseConfigured,
    loading,
    user,
    status,
    message,
    authError,
    signInGoogle,
    signOut,
  }), [loading, user, status, message, authError, signInGoogle, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth deve ser usado dentro de AuthProvider.');
  return value;
}
