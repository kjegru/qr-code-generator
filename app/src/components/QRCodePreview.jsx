// src/components/QRCodePreview.jsx

import React, { useEffect, useRef } from 'react';

function QRCodePreview({ qrCode, options }) {
  const qrRef = useRef(null);

  useEffect(() => {
    qrCode.current.append(qrRef.current);
  }, []);

  const handleDownload = (format) => {
    qrCode.current.download({ extension: format });
  };

  return (
    <div className="w-full md:w-1/2 p-4 flex flex-col items-center">
      <div ref={qrRef} />
      <div className="mt-4 flex flex-wrap justify-center">
        <button
          onClick={() => handleDownload('png')}
          className="m-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Download PNG
        </button>
        <button
          onClick={() => handleDownload('jpeg')}
          className="m-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Download JPEG
        </button>
        <button
          onClick={() => handleDownload('svg')}
          className="m-2 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Download SVG
        </button>
      </div>
    </div>
  );
}

export default QRCodePreview;
