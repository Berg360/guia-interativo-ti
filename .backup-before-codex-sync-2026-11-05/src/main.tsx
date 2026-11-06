import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((error) => console.error('Falha no modo offline:', error));
  });
}
ReactDOM.createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);

