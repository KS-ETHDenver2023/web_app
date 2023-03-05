import React from 'react';

function DownloadButton() {
  const handleDownload = () => {
    const fileUrl = 'https://github.com/KS-ETHDenver2023/ring_signature/raw/main/dist/signator';
    const link = document.createElement('a');
    link.href = fileUrl;
    link.setAttribute('download', 'signator');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button onClick={handleDownload} className="download-button">Download .exe</button>
  );
}

export default DownloadButton;