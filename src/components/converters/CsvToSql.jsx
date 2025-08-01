import React, { useState } from 'react';
import { Copy } from 'lucide-react';

export default function CsvToSql() {
  const [csvInput, setCsvInput] = useState('');
  const [sqlOutput, setSqlOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const convertCsvToSql = () => {
    try {
      const lines = csvInput.trim().split('\n');
      if (lines.length < 2) {
        setSqlOutput('Error: Not enough rows to convert.');
        return;
      }

      const headers = lines[0].split(',').map((h) => h.trim());
      const tableName = 'your_table_name';

      const values = lines.slice(1).map((line) => {
        const row = line.split(',').map((value) => `'${value.trim()}'`).join(', ');
        return `(${row})`;
      });

      const sql = `INSERT INTO ${tableName} (${headers.join(', ')}) VALUES\n${values.join(',\n')};`;
      setSqlOutput(sql);
    } catch (error) {
      setSqlOutput('Error converting CSV to SQL.');
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(sqlOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-2xl">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">CSV ⇨ SQL Converter</h2>

      <label className="block text-gray-700 font-medium mb-1">CSV Input:</label>
      <textarea
        className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 mb-4"
        value={csvInput}
        onChange={(e) => setCsvInput(e.target.value)}
        placeholder="name,email\nJohn,john@example.com"
      />

      <button
        onClick={convertCsvToSql}
        className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-lg transition mb-6"
      >
        Convert
      </button>

      <label className="block text-gray-700 font-medium mb-1">SQL Output:</label>
      <div className="relative">
        <textarea
          className="w-full h-40 p-3 border border-gray-300 rounded-lg bg-gray-50 text-sm"
          readOnly
          value={sqlOutput}
        />
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 bg-gray-800 hover:bg-gray-900 text-white px-3 py-1 rounded flex items-center gap-1"
        >
          <Copy size={16} />
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
}
