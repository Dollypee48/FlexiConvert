import React, { useState } from "react";
import { Copy } from "lucide-react";

export default function CsvToSql() {
  const [csvInput, setCsvInput] = useState("");
  const [sqlOutput, setSqlOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const convertCsvToSql = () => {
    try {
      const lines = csvInput.trim().split("\n");
      if (lines.length < 2) {
        setSqlOutput("⚠️ Error: Not enough rows to convert.");
        return;
      }

      const headers = lines[0].split(",").map((h) => h.trim());
      const tableName = "your_table_name";

      const values = lines.slice(1).map((line) => {
        const row = line
          .split(",")
          .map((value) => `'${value.trim()}'`)
          .join(", ");
        return `(${row})`;
      });

      const sql = `INSERT INTO ${tableName} (${headers.join(", ")}) VALUES\n${values.join(",\n")};`;
      setSqlOutput(sql);
    } catch (error) {
      setSqlOutput("❌ Error converting CSV to SQL.");
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(sqlOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-3xl bg-gradient-to-tr from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 shadow-2xl">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600">
          FlexiConvert – CSV ⇨ SQL Generator
        </h1>
        <p className="text-gray-500 dark:text-gray-300 mt-1 text-sm">
          Seamlessly transform your spreadsheet data into clean SQL queries.
        </p>
      </header>

      <div className="mb-6">
        <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
          📥 Paste CSV Data
        </label>
        <textarea
          className="w-full h-44 p-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          placeholder="name,email\nJohn,john@example.com"
          value={csvInput}
          onChange={(e) => setCsvInput(e.target.value)}
        />
      </div>

      <div className="text-right mb-8">
        <button
          onClick={convertCsvToSql}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold transition shadow-md hover:shadow-lg"
        >
          Convert to SQL
        </button>
      </div>

      <div>
        <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
          📤 SQL Output
        </label>
        <div className="relative">
          <textarea
            readOnly
            className="w-full h-48 p-4 text-sm rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-100 font-mono"
            value={sqlOutput}
          />
          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 flex items-center gap-1 px-3 py-1.5 bg-gray-800 text-white text-xs font-semibold rounded-md hover:bg-gray-900 transition"
          >
            <Copy size={14} />
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}
