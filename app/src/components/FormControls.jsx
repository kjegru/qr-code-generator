// FormControls.jsx

import React from 'react';

function FormControls({ options, setOptions }) {
    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if (type === 'checkbox') {
          setOptions((prev) => ({ ...prev, [name]: checked }));
        } else if (type === 'file') {
          if (name === 'logoImage') {
            const fileReader = new FileReader();
            fileReader.onload = () => {
              setOptions((prev) => ({ ...prev, logoImage: fileReader.result }));
            };
            fileReader.readAsDataURL(files[0]);
          }
        } else {
          if (name === 'width' || name === 'height') {
            // Ensure temporary empty input is allowed
            const numericValue = parseInt(value, 10);
            if (!value || numericValue < 100 || numericValue > 1000) {
              setOptions((prev) => ({ ...prev, [name]: value }));
              return;
            }
          }

          setOptions((prev) => ({ ...prev, [name]: value }));
        }
      };

  const maxLogoSize = Math.min(options.width, options.height) * 0.8 / options.width;

  return (
    <form className="w-full md:w-1/2 p-4">
      {/* Data Settings Section */}
      <h2 className="text-xl font-semibold mb-2">Data Settings</h2>

      {/* QR Code Data Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">QR Code Data</label>
        <input
          type="text"
          name="data"
          value={options.data}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Enter your data here"
        />
      </div>

      {/* QR Code Type Dropdown */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">QR Code Type</label>
        <select
          name="qrType"
          value={options.qrType}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="URL">URL</option>
          <option value="Text">Text</option>
          <option value="Email">Email</option>
          <option value="WiFi">WiFi Credentials</option>
          <option value="vCard">vCard</option>
        </select>
      </div>

      {/* Appearance Settings Section */}
      <h2 className="text-xl font-semibold mb-2 mt-6">Appearance Settings</h2>

      {/* Center Logo Upload */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Center Logo</label>
        <input
          type="file"
          name="logoImage"
          accept="image/*"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Logo Size Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Logo Size (relative)</label>
        <input
          type="range"
          name="logoSize"
          min="0.05" // Minimum size: 5% of the QR code
          max="0.74"  // Maximum size: 50% of the QR code
          step="0.01"
          value={options.logoSize}
          onChange={(e) =>
            setOptions((prev) => ({ ...prev, logoSize: parseFloat(e.target.value) }))
          }
          className="w-full"
        />
        <p className="text-sm text-gray-600">
          Current size: {(options.logoSize * 100).toFixed(0)}%
        </p>
      </div>

        {/* QR Code Size */}
        <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Size (px)</label>
        <input
            type="number"
            name="width"
            value={options.width}
            onChange={(e) => {
            const numericValue = parseInt(e.target.value, 10);

            if (!e.target.value) {
                // Allow temporary empty input but keep a default size
                setOptions((prev) => ({ ...prev, width: '', height: '' }));
            } else if (numericValue >= 100 && numericValue <= 1000) {
                // Apply valid values for both width and height
                setOptions((prev) => ({
                ...prev,
                width: numericValue,
                height: numericValue,
                }));
            }
            }}
            className="w-full p-2 border rounded"
            min="100"
            max="1000"
            placeholder="Enter size"
        />
        <p className="text-sm text-gray-600">
            Size must be between 100px and 1000px. Current: {options.width || 300}px ×{' '}
            {options.height || 300}px
        </p>
        </div>

      {/* Dot Shape */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Dot Shape</label>
        <select
          name="dotShape"
          value={options.dotShape}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="square">Square</option>
          <option value="dots">Dots</option>
          <option value="rounded">Rounded</option>
          <option value="classy">Classy</option>
          <option value="classy-rounded">Classy Rounded</option>
          <option value="extra-rounded">Extra Rounded</option>
        </select>
      </div>

      {/* Background Color */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Background Color</label>
        <input
          type="color"
          name="bgColor"
          value={options.bgColor}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          disabled={options.transparentBackground}
        />
        <div className="mt-2">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="transparentBackground"
              checked={options.transparentBackground}
              onChange={handleChange}
              className="form-checkbox"
            />
            <span className="ml-2">Transparent Background</span>
          </label>
        </div>
      </div>

      {/* Foreground Color */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Foreground Color</label>
        <input
          type="color"
          name="fgColor"
          value={options.fgColor}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Error Correction Level */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Error Correction Level</label>
        <select
          name="errorCorrectionLevel"
          value={options.errorCorrectionLevel}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="L">Low (7%)</option>
          <option value="M">Medium (15%)</option>
          <option value="Q">Quartile (25%)</option>
          <option value="H">High (30%)</option>
        </select>
      </div>
    </form>
  );
}

export default FormControls;
