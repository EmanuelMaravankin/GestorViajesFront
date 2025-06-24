import { useEffect, useState } from 'react';

const PWAInstallPrompt = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const onClick = (evt) => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };

  if (!supportsPWA) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50">
      <p className="mb-2">¡Instala AvionesApp en tu dispositivo!</p>
      <button
        className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition-colors"
        onClick={onClick}
      >
        Instalar App
      </button>
    </div>
  );
};

export default PWAInstallPrompt;