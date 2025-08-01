import React, { useState } from "react";
import { parseJsonToSql } from "../../utils/sqlUtils";

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
    <div className="max-w-4xl mx-auto bg-white border border-gray-200 shadow-lg rounded-2xl p-8 space-y-6">
      <h2 className="text-3xl font-bold text-indigo-700 border-b pb-3">🧩 JSON → SQL Converter</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Paste JSON</label>
          <textarea
            rows="10"
            value={json}
            onChange={(e) => setJson(e.target.value)}
            placeholder='[{"name":"John","age":30}]'
            className="w-full border border-gray-300 rounded-lg p-4 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Table Name</label>
          <input
            type="text"
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            placeholder="Enter SQL table name"
            className="w-full border border-gray-300 rounded-lg p-3 mb-4 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />

          <button
            onClick={handleConvert}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition duration-300"
          >
            Convert to SQL
          </button>

          {error && <p className="mt-4 text-red-600 text-sm font-medium">{error}</p>}
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-semibold mb-2 text-gray-700">SQL Output</label>
        <textarea
          rows="10"
          readOnly
          value={sql}
          placeholder="SQL output will appear here..."
          className="w-full border border-gray-300 rounded-lg p-4 text-sm bg-gray-50 font-mono"
        />
        <div className="flex justify-end mt-3">
          <button
            onClick={handleCopy}
            disabled={!sql}
            className={`px-4 py-2 text-sm rounded-lg transition duration-300 ${
              sql
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-gray-400 text-white cursor-not-allowed"
            }`}
          >
            {copied ? "✅ Copied!" : "📋 Copy to Clipboard"}
          </button>
        </div>
      </div>
    </div>
  );
}
