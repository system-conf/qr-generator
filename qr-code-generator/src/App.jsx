import React, { useState, useRef } from 'react';
import QRCode from 'qrcode.react';
import QRCodeLib from 'qrcode';
import { saveAs } from 'file-saver';
import './index.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [fgColor, setFgColor] = useState('#000000'); // Default foreground color
  const [bgColor, setBgColor] = useState('rgba(0, 0, 0, 0)'); // Default background color as transparent
  const qrRef = useRef(null);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const downloadPNG = () => {
    const qrCodeCanvas = qrRef.current.querySelector('canvas');
    qrCodeCanvas.toBlob((blob) => {
      saveAs(blob, 'qr-code.png');
    }, 'image/png');
  };

  const downloadJPEG = () => {
    const qrCodeCanvas = qrRef.current.querySelector('canvas');
    qrCodeCanvas.toBlob((blob) => {
      saveAs(blob, 'qr-code.jpeg');
    }, 'image/jpeg');
  };

  const downloadSVG = () => {
    QRCodeLib.toString(inputValue, { type: 'svg', color: { dark: fgColor, light: bgColor } }, (err, url) => {
      if (err) throw err;
      const blob = new Blob([url], { type: 'image/svg+xml' });
      saveAs(blob, 'qr-code.svg');
    });
  };

  return (
    <div className="container">
      <h1>QR Kod Oluşturucu</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="QR kodu için metin girin"
        className="input-box"
      />
      <div className="color-picker">
        <label>Ön Plan Rengi: </label>
        <input
          type="color"
          value={fgColor}
          onChange={(e) => setFgColor(e.target.value)}
        />
      </div>
      <div className="color-picker">
        <label>Arka Plan Rengi: </label>
        <input
          type="color"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
        />
        <button onClick={() => setBgColor('rgba(0, 0, 0, 0)')}>Transparan</button>
      </div>
      <div ref={qrRef} className="qr-box" style={{ marginTop: '20px' }}>
        <QRCode value={inputValue} size={256} fgColor={fgColor} bgColor={bgColor} /> {/* Sabit önizleme boyutu */}
      </div>
      <div className="button-container">
        <button onClick={downloadPNG} className="download-button">PNG İndir</button>
        <button onClick={downloadJPEG} className="download-button">JPEG İndir</button>
        <button onClick={downloadSVG} className="download-button">SVG İndir</button>
      </div>
    </div>
  );
}

export default App;
