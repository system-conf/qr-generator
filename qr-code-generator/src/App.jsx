import React, { useState } from 'react';
import QRCode from 'qrcode.react';

function App() {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>QR Kod Oluşturucu</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="QR kodu için metin girin"
        style={{ padding: '10px', width: '300px' }}
      />
      <div style={{ marginTop: '20px' }}>
        <QRCode value={inputValue} />
      </div>
    </div>
  );
}

export default App;
