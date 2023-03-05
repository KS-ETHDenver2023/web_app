import React from 'react';

function DownloadButton() {
  const handleDownload = () => {
    const fileUrl = 'https://example.com/myfile.exe';
    const link = document.createElement('a');
    link.href = fileUrl;
    link.setAttribute('download', 'myfile.exe');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button onClick={handleDownload} className="download-button">Download .exe</button>
  );
}

export default DownloadButton;