import React, { useState } from "react";
import * as XLSX from "xlsx";
import { Copy } from "lucide-react";

export default function ExcelToJson() {
  const [jsonOutput, setJsonOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = evt.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
      setJsonOutput(JSON.stringify(jsonData, null, 2));
    };
    reader.readAsBinaryString(file);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonOutput).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-3xl bg-gradient-to-tr from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 shadow-2xl">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600">
          Excel ⇨ JSON Converter
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1 text-sm">
          Easily transform your Excel spreadsheets into clean, readable JSON.
        </p>
      </header>

      <div className="mb-6">
        <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
          📂 Upload Excel File
        </label>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          className="w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
        />
      </div>

      <div>
        <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
          📤 JSON Output
        </label>
        <div className="relative">
          <textarea
            readOnly
            rows={14}
            value={jsonOutput}
            placeholder="Converted JSON will appear here..."
            className="w-full p-4 text-sm font-mono rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-inner resize-none"
          />
          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 flex items-center gap-1 px-3 py-1.5 bg-yellow-600 text-white text-xs font-semibold rounded-md hover:bg-yellow-700 transition"
          >
            <Copy size={14} />
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}
