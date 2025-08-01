import React, { useState } from "react";
import * as XLSX from "xlsx";
import { Clipboard, ClipboardCheck, Download } from "lucide-react";

const CsvToExcel = () => {
  const [csvData, setCsvData] = useState("");
  const [fileName, setFileName] = useState("converted.xlsx");
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    const rows = csvData
      .split("\n")
      .map((row) => row.split(",").map((cell) => cell.trim()));
    const worksheet = XLSX.utils.aoa_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, fileName);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(csvData);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 rounded-2xl shadow-2xl bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 transition-all">
      <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600">
        Convert CSV to Excel
      </h2>

      <div className="mb-6">
        <label className="block mb-2 text-gray-700 dark:text-gray-200 font-medium">
          Paste Your CSV Data
        </label>
        <textarea
          rows="10"
          value={csvData}
          onChange={(e) => setCsvData(e.target.value)}
          placeholder="Name, Age, City\nAlice, 30, Lagos\nBob, 25, Abuja"
          className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 dark:text-white"
        ></textarea>
      </div>

      <div className="mb-6">
        <label className="block mb-2 text-gray-700 dark:text-gray-200 font-medium">
          Output File Name
        </label>
        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          placeholder="converted.xlsx"
          className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:text-white"
        />
      </div>

      <div className="flex flex-wrap gap-4 mt-4">
        <button
          onClick={handleConvert}
          className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-lg font-semibold transition duration-200"
        >
          <Download size={18} />
          Download Excel
        </button>

        <button
          onClick={handleCopy}
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-6 py-2 rounded-lg font-medium transition"
        >
          {copied ? <ClipboardCheck size={18} /> : <Clipboard size={18} />}
          {copied ? "Copied!" : "Copy CSV"}
        </button>
      </div>
    </div>
  );
};

export default CsvToExcel;
