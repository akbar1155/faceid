import { useEffect, useRef, useState } from 'react';
import exclamation from "./assets/image.png"
import './App.css';
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      console.log(e.data);
      if (e.data.cmd === -1 && e.data.message === 'ready') {
        openCamera();
      }
    };
    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);
  const openCamera = () => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage({ cmd: 'open', config: { locale: 'uz' } }, '*');
    }
  };
  const closeCamera = () => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage({ cmd: 'close' }, '*');
    }
  };
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="container">
      <iframe
        className='faceid'
        ref={iframeRef}
        id="myid_iframe"
        src="https://docs.myid.uz/iframe"
        allow="camera;fullscreen"
        allowFullScreen
      ></iframe>
      <button onClick={openCamera}>Open Camera</button>
      <button onClick={closeCamera}>Close Camera</button>
      <button onClick={toggleModal}>
        Info
      </button>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={toggleModal}>&times;</span>
            <img src={exclamation} alt="Modal Content" />
          </div>
        </div>
      )}
    </div>
  );
}
export default App;