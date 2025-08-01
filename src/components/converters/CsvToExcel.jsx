import React, { useState } from "react";
import * as XLSX from "xlsx";

const CsvToExcel = () => {
  const [csvData, setCsvData] = useState("");
  const [fileName, setFileName] = useState("converted.xlsx");
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    const rows = csvData.split("\n").map((row) => row.split(","));
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
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white shadow-xl rounded-2xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
        CSV to Excel Converter
      </h2>

      <label className="block mb-2 text-gray-700 font-medium">
        Paste CSV Data:
      </label>
      <textarea
        rows="10"
        value={csvData}
        onChange={(e) => setCsvData(e.target.value)}
        placeholder="Name, Age, City\nAlice, 30, Lagos\nBob, 25, Abuja"
        className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
      ></textarea>

      <label className="block mb-2 text-gray-700 font-medium">
        File Name:
      </label>
      <input
        type="text"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-600"
        placeholder="converted.xlsx"
      />

      <div className="flex flex-wrap gap-4">
        <button
          onClick={handleConvert}
          className="bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-800 transition"
        >
          Download Excel
        </button>
        <button
          onClick={handleCopy}
          className="bg-gray-200 text-blue-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-300 transition"
        >
          {copied ? "Copied!" : "Copy CSV"}
        </button>
      </div>
    </div>
  );
};

export default CsvToExcel;
