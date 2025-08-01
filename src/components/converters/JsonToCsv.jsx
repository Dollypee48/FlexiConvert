import React, { useState } from 'react';
import { Copy } from 'lucide-react';

export default function JsonToCsv() {
  const [jsonInput, setJsonInput] = useState('');
  const [csvOutput, setCsvOutput] = useState('');
  const [error, setError] = useState('');

  const convertToCsv = () => {
    try {
      const json = JSON.parse(jsonInput);
      if (!Array.isArray(json)) throw new Error("JSON must be an array of objects");

      const keys = Object.keys(json[0]);
      const csv = [keys.join(',')].concat(
        json.map(obj =>
          keys.map(k => JSON.stringify(obj[k] ?? '')).join(',')
        )
      ).join('\n');

      setCsvOutput(csv);
      setError('');
    } catch (err) {
      setError(err.message);
      setCsvOutput('');
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(csvOutput);
      alert("CSV copied to clipboard!");
    } catch (err) {
      alert("Failed to copy");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md border border-blue-100 space-y-6">
      <h2 className="text-2xl font-bold text-blue-800">JSON to CSV Converter</h2>

      <textarea
        rows={8}
        className="w-full p-4 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder='Paste your JSON array here...'
        value={jsonInput}
        onChange={e => setJsonInput(e.target.value)}
      ></textarea>

      <button
        onClick={convertToCsv}
        className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-2 rounded-md transition"
      >
        Convert
      </button>

      {error && (
        <p className="text-red-600 font-medium">{error}</p>
      )}

      <div className="relative">
        <textarea
          rows={10}
          className="w-full p-4 border border-blue-200 rounded-md bg-gray-50 text-sm"
          placeholder="CSV output will appear here..."
          value={csvOutput}
          readOnly
        ></textarea>

        {csvOutput && (
          <button
            onClick={copyToClipboard}
            className="absolute top-2 right-2 flex items-center px-3 py-1 text-sm text-blue-800 bg-blue-100 hover:bg-blue-200 rounded-md"
          >
            <Copy className="w-4 h-4 mr-1" />
            Copy
          </button>
        )}
      </div>
    </div>
  );
}
