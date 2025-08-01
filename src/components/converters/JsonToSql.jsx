import React, { useState } from "react";
import { parseJsonToSql } from "../../utils/sqlUtils";
import { ClipboardCopy, CheckCircle } from "lucide-react";

export default function JsonToSql() {
  const [json, setJson] = useState("");
  const [tableName, setTableName] = useState("my_table");
  const [sql, setSql] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    try {
      const parsed = JSON.parse(json);
      const result = parseJsonToSql(parsed, tableName.trim());
      setSql(result);
      setError("");
    } catch (err) {
      setSql("");
      setError("❌ Invalid JSON format");
    }
  };

  const handleCopy = () => {
    if (!sql) return;
    navigator.clipboard.writeText(sql).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="max-w-5xl mx-auto bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl rounded-3xl p-10 space-y-8 transition-all">
      <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600">
        🧩 JSON → SQL Converter
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Paste JSON
          </label>
          <textarea
            rows="10"
            value={json}
            onChange={(e) => setJson(e.target.value)}
            placeholder='[{"name":"John","age":30}]'
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 text-sm font-mono focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
          />
        </div>

        <div className="flex flex-col">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Table Name
            </label>
            <input
              type="text"
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
              placeholder="Enter SQL table name"
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-3 mb-5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <button
            onClick={handleConvert}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-2 rounded-xl shadow-md transition-transform active:scale-95"
          >
            🚀 Convert to SQL
          </button>

          {error && (
            <p className="mt-4 text-red-600 dark:text-red-400 text-sm font-medium animate-pulse">
              {error}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
          SQL Output
        </label>
        <textarea
          rows="10"
          readOnly
          value={sql}
          placeholder="SQL output will appear here..."
          className="w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 rounded-xl p-4 text-sm font-mono text-gray-700 dark:text-gray-200"
        />
        <div className="flex justify-end mt-3">
          <button
            onClick={handleCopy}
            disabled={!sql}
            className={`flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-xl transition duration-300 ${
              sql
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-gray-400 text-white cursor-not-allowed"
            }`}
          >
            {copied ? (
              <>
                <CheckCircle className="w-4 h-4" /> Copied!
              </>
            ) : (
              <>
                <ClipboardCopy className="w-4 h-4" /> Copy to Clipboard
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
