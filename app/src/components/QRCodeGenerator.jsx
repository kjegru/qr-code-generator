// QRCodeGenerator.jsx

import React, { useState, useRef, useEffect } from 'react';
import QRCodeStyling from 'qr-code-styling';
import QRCodePreview from './QRCodePreview';
import FormControls from './FormControls';

function QRCodeGenerator() {
    const [options, setOptions] = useState({
        data: '',
        qrType: 'URL',
        width: 300, // Default size
        height: 300, // Default size
        dotShape: 'square',
        bgColor: '#FFFFFF',
        fgColor: '#000000',
        errorCorrectionLevel: 'M',
        logoImage: '',
        logoSize: 0.15,
        transparentBackground: false,
      });

  const qrCode = useRef(
    new QRCodeStyling({
      width: options.width,
      height: options.height,
      data: options.data,
      dotsOptions: { type: options.dotShape, color: options.fgColor },
      backgroundOptions: { color: options.bgColor },
      image: options.logoImage,
      imageOptions: {
        crossOrigin: 'anonymous',
        imageSize: options.logoSize, // Use the logoSize value
        margin: 20,
      },
    })
  );

// Ensure the canvas size is valid before updating the QR code
useEffect(() => {
    const canvasWidth = Math.max(options.width || 300, 100); // Minimum width: 100px
    const canvasHeight = Math.max(options.height || 300, 100); // Minimum height: 100px

    qrCode.current.update({
      width: canvasWidth,
      height: canvasHeight,
      data: options.data,
      dotsOptions: { type: options.dotShape, color: options.fgColor },
      backgroundOptions: {
        color: options.transparentBackground ? 'transparent' : options.bgColor,
      },
      image: options.logoImage,
      imageOptions: {
        crossOrigin: 'anonymous',
        imageSize: options.logoSize,
        margin: 10,
      },
      qrOptions: {
        errorCorrectionLevel: options.errorCorrectionLevel,
      },
    });
  }, [options]);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Custom QR Code Generator</h1>
      <p className="mb-8 text-center text-gray-700">
        Generate your own QR codes with custom styles and data types. Add a logo to the center and adjust its size.
      </p>
      <div className="flex flex-col md:flex-row">
        <FormControls options={options} setOptions={setOptions} />
        <QRCodePreview qrCode={qrCode} options={options} />
      </div>
    </div>
  );
}

export default QRCodeGenerator;
