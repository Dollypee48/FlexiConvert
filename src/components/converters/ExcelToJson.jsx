import React, { useState } from "react";
import * as XLSX from "xlsx";
import { ClipboardIcon } from "@heroicons/react/24/outline";

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
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 border border-blue-900">
      <h2 className="text-2xl font-bold text-blue-900 mb-4">📊 Excel ⇨ JSON Converter</h2>

      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        className="block w-full text-gray-700 border border-blue-800 rounded-md p-2 mb-4 cursor-pointer bg-blue-50"
      />

      <label className="block text-sm font-medium text-gray-800 mb-1">Converted Output:</label>
      <div className="relative">
        <textarea
          readOnly
          rows={14}
          value={jsonOutput}
          className="w-full p-3 border border-blue-800 rounded-md bg-gray-100 text-sm font-mono text-gray-800"
          placeholder="Converted JSON will appear here..."
        />
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 text-blue-800 hover:text-blue-900 bg-white border border-blue-800 px-2 py-1 rounded-md flex items-center space-x-1 text-sm"
        >
          <ClipboardIcon className="h-4 w-4" />
          <span>{copied ? "Copied!" : "Copy"}</span>
        </button>
      </div>
    </div>
  );
}
