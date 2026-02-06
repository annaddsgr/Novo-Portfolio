import { useEffect } from 'react';

export function VLibras() {
  useEffect(() => {
    const scriptSrc = 'https://vlibras.gov.br/app/vlibras-plugin.js';
    
    if (document.querySelector(`script[src="${scriptSrc}"]`)) return;

    const script = document.createElement('script');
    script.src = scriptSrc;
    script.async = true;
    
    script.onload = () => {
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      new (window as any).VLibras.Widget('https://vlibras.gov.br/app');
    };
    
    document.body.appendChild(script);
  }, []);

  // Estrutura exigida pelo widget
  return (
    <div className="vlibras-widget enabled" style={{ zIndex: 99999 }}>
      <div className="vw-access-button-active"></div>
      <div className="vw-plugin-wrapper">
        <div className="vw-plugin-top-wrapper"></div>
      </div>
    </div>
  );
}
