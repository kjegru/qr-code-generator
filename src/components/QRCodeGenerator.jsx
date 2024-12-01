// QRCodeGenerator.jsx

import React, { useState, useRef, useEffect } from 'react';
import QRCodeStyling from 'qr-code-styling';
import QRCodePreview from './QRCodePreview';
import FormControls from './FormControls';

function QRCodeGenerator() {
  const [options, setOptions] = useState({
    data: '',
    qrType: 'URL',
    width: 300,
    height: 300,
    dotShape: 'square',
    bgColor: '#FFFFFF',
    fgColor: '#000000',
    errorCorrectionLevel: 'M',
    logoImage: '',
    logoSize: 0.15, // Adjust this to change the default size of the logo
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

  useEffect(() => {
    qrCode.current.update({
      width: options.width,
      height: options.height,
      data: options.data,
      dotsOptions: { type: options.dotShape, color: options.fgColor },
      backgroundOptions: {
        color: options.transparentBackground ? 'transparent' : options.bgColor,
      },
      image: options.logoImage,
      imageOptions: {
        crossOrigin: 'anonymous',
        imageSize: options.logoSize, // Update with the current logoSize
        margin: 20,
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
