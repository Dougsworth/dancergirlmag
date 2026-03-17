import { createRoot } from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'
import App from './App.tsx'
import './index.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primeicons/primeicons.css'
import i18n from './lib/i18n'

createRoot(document.getElementById("root")!).render(
  <I18nextProvider i18n={i18n}>
    <App />
  </I18nextProvider>
);
