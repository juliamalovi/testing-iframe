"use client"
import { useRef, useState } from "react"
import Script from 'next/script';

export default function Home() {
  const [language, setLanguage] = useState('en')
  const iframeRef = useRef(null);
  const handleChangeLanguage = (lang: string) => {
    setLanguage(lang);
    const iframe = iframeRef.current as HTMLIFrameElement | null;
    if (iframe && iframe.contentWindow) {
      const message = { action: 'changeLanguage', language: lang };
      iframe.contentWindow.postMessage(message, 'http://localhost:3000');
    }
  }
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex gap-4">
          <button
            onClick={() => handleChangeLanguage('en')}
            className={`px-4 py-2 border ${language === 'en' ? 'bg-blue-500 text-white' : ''}`}
          >
            English
          </button>
          <button
            onClick={() => handleChangeLanguage('it')}
            className={`px-4 py-2 border ${language === 'it' ? 'bg-blue-500 text-white' : ''}`}
          >
            Italian
          </button>
        </div>
        <iframe
          id="myIframe"
          ref={iframeRef}
          src={`http://localhost:3000`}
          title="sports betting"
          width="1500"
          height="800"
          className="border-red-600 border-4"
        >
        </iframe>

        <Script id="post-message-script" strategy="afterInteractive">
          {`
          const iframe = document.getElementById('myIframe');
          const message = { action: 'changeLanguage', language: ${language} };
          iframe.onload = function() {
            iframe.contentWindow.postMessage(message, 'http://localhost:3000');
          };
        `}
        </Script>
      </main>
    </div>
  )
}
