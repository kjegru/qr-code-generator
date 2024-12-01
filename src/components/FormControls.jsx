// src/components/FormControls.jsx

import React from 'react';

function FormControls({ options, setOptions }) {
  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'checkbox') {
      setOptions((prev) => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      if (name === 'logoImage') {
        // Handle logo image upload
        const fileReader = new FileReader();
        fileReader.onload = () => {
          setOptions((prev) => ({ ...prev, logoImage: fileReader.result }));
        };
        fileReader.readAsDataURL(files[0]);
      }
    } else {
      if (name === 'data') {
        let isValid = true;

        // Input validation based on QR code type
        if (options.qrType === 'URL') {
          const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
          isValid = urlPattern.test(value);
          if (!isValid && value !== '') {
            alert('Please enter a valid URL starting with http:// or https://');
            return;
          }
        } else if (options.qrType === 'Email') {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          isValid = emailPattern.test(value);
          if (!isValid && value !== '') {
            alert('Please enter a valid email address.');
            return;
          }
        }
        // Add more validations for other types if needed

        setOptions((prev) => ({ ...prev, [name]: value }));
      } else {
        setOptions((prev) => ({ ...prev, [name]: value }));
      }
    }
  };

  // Handle .vcf file upload for vCard QR codes
  const handleVcfUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setOptions((prev) => ({ ...prev, data: event.target.result }));
      };
      reader.readAsText(file);
    }
  };

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
          disabled={options.qrType === 'vCard'}
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

      {/* vCard Upload Field */}
      {options.qrType === 'vCard' && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Upload vCard (.vcf)</label>
          <input
            type="file"
            accept=".vcf"
            onChange={handleVcfUpload}
            className="w-full p-2 border rounded"
          />
        </div>
      )}

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

      {/* QR Code Size */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Size (px)</label>
        <input
          type="number"
          name="width"
          value={options.width}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          min="100"
          max="1000"
        />
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
