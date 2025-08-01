import React, { useState } from "react";
import { Copy, Repeat } from "lucide-react";

export default function JsonToCsv() {
  const [jsonInput, setJsonInput] = useState("");
  const [csvOutput, setCsvOutput] = useState("");
  const [error, setError] = useState("");

  const convertToCsv = () => {
    try {
      const json = JSON.parse(jsonInput);
      if (!Array.isArray(json)) throw new Error("JSON must be an array of objects");

      const keys = Object.keys(json[0]);
      const csv = [keys.join(",")]
        .concat(json.map(obj => keys.map(k => JSON.stringify(obj[k] ?? "")).join(",")))
        .join("\n");

      setCsvOutput(csv);
      setError("");
    } catch (err) {
      setError(err.message);
      setCsvOutput("");
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(csvOutput);
      alert("CSV copied to clipboard!");
    } catch {
      alert("Failed to copy");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg space-y-6 transition-all">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600">🔄 JSON to CSV Converter</h2>
        <button
          onClick={() => {
            setJsonInput("");
            setCsvOutput("");
            setError("");
          }}
          className="flex items-center px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg"
        >
          <Repeat size={16} className="mr-2" />
          Reset
        </button>
      </div>

      <div className="space-y-2">
        <label className="font-medium text-gray-700 dark:text-gray-200">Paste JSON Array:</label>
        <textarea
          rows={8}
          className="w-full p-4 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono resize-none"
          placeholder='[{"name": "John", "age": 30}, {"name": "Jane", "age": 25}]'
          value={jsonInput}
          onChange={e => setJsonInput(e.target.value)}
        ></textarea>
      </div>

      <button
        onClick={convertToCsv}
        className="w-full md:w-auto px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold rounded-md transition duration-300"
      >
        Convert to CSV
      </button>

      {error && <p className="text-red-600 font-medium">{error}</p>}

      {csvOutput && (
        <div className="space-y-2 mt-6 relative">
          <label className="font-medium text-gray-700 dark:text-gray-200">CSV Output:</label>
          <textarea
            rows={10}
            className="w-full p-4 border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-sm text-gray-800 dark:text-white rounded-lg font-mono resize-none"
            value={csvOutput}
            readOnly
          ></textarea>

          <button
            onClick={copyToClipboard}
            className="absolute top-2 right-2 flex items-center px-3 py-1.5 text-sm text-blue-800 bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-lg"
          >
            <Copy size={16} className="mr-1" />
            Copy
          </button>
        </div>
      )}
    </div>
  );
}
