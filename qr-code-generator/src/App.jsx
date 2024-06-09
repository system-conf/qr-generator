import React, { useState, useRef } from 'react';
import QRCode from 'qrcode.react';
import { saveAs } from 'file-saver';
import ReactSlider from 'react-slider';
import './index.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [downloadSize, setDownloadSize] = useState(1080); // Default download size
  const [fgColor, setFgColor] = useState('#000000'); // Default foreground color
  const [bgColor, setBgColor] = useState('rgba(0, 0, 0, 0)'); // Default background color as transparent
  const qrRef = useRef(null);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSliderChange = (value) => {
    setDownloadSize(value);
  };

  const downloadImage = (format) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const qrCodeCanvas = qrRef.current.querySelector('canvas');

    canvas.width = downloadSize;
    canvas.height = downloadSize;

    context.drawImage(qrCodeCanvas, 0, 0, qrCodeCanvas.width, qrCodeCanvas.height, 0, 0, downloadSize, downloadSize);

    canvas.toBlob((blob) => {
      saveAs(blob, `qr-code.${format}`);
    }, `image/${format}`);
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
      <div className="slider-container">
        <label>Boyut: {downloadSize}px</label>
        <ReactSlider
          className="horizontal-slider"
          thumbClassName="example-thumb"
          trackClassName="example-track"
          min={64}
          max={1080}
          value={downloadSize}
          onChange={handleSliderChange}
        />
      </div>
      <div ref={qrRef} className="qr-box" style={{ marginTop: '20px' }}>
        <QRCode value={inputValue} size={128} fgColor={fgColor} bgColor={bgColor} /> {/* Sabit önizleme boyutu */}
      </div>
      <div className="button-container">
        <button onClick={() => downloadImage('png')} className="download-button">PNG İndir</button>
        <button onClick={() => downloadImage('jpeg')} className="download-button">JPEG İndir</button>
        <button onClick={() => downloadImage('svg')} className="download-button">SVG İndir</button>
      </div>
    </div>
  );
}

export default App;
