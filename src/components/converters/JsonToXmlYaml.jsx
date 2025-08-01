import React, { useState } from "react";
import yaml from "js-yaml";
import { Copy, Download, Code2 } from "lucide-react";

export default function JsonToXmlYaml() {
  const [jsonInput, setJsonInput] = useState("");
  const [output, setOutput] = useState("");
  const [format, setFormat] = useState("xml");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const convertJson = () => {
    try {
      const jsonObj = JSON.parse(jsonInput);
      let result;

      if (format === "xml") {
        result = "<root>";
        for (const key in jsonObj) {
          result += `<${key}>${jsonObj[key]}</${key}>`;
        }
        result += "</root>";
      } else {
        result = yaml.dump(jsonObj);
      }

      setOutput(result);
      setError("");
    } catch (err) {
      setOutput("");
      setError("❌ Invalid JSON format. Please check your input.");
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `converted.${format === "yaml" ? "yaml" : "xml"}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded-3xl shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <Code2 size={28} className="text-green-600 dark:text-green-400" />
        <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white tracking-tight">
          FlexiConvert – JSON to {format.toUpperCase()}
        </h1>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          className="w-full md:w-40 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <option value="xml">XML</option>
          <option value="yaml">YAML</option>
        </select>

        <button
          onClick={convertJson}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:to-green-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition"
        >
          Convert
        </button>
      </div>

      <textarea
        rows={8}
        className="w-full bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-xl p-4 mb-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        placeholder='Paste your JSON here... e.g. { "name": "FlexiConvert", "type": "tool" }'
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />

      {error && (
        <p className="text-red-600 font-medium text-sm mb-4">{error}</p>
      )}

      <div className="flex justify-end gap-3 mb-4">
        <button
          onClick={handleCopy}
          disabled={!output}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md shadow-sm disabled:opacity-50"
        >
          <Copy size={16} />
          {copied ? "Copied!" : "Copy"}
        </button>

        <button
          onClick={handleDownload}
          disabled={!output}
          className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium rounded-md shadow-sm disabled:opacity-50"
        >
          <Download size={16} />
          Download
        </button>
      </div>

      {output && (
        <pre className="w-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-xl p-4 text-sm font-mono overflow-x-auto whitespace-pre-wrap">
          {output}
        </pre>
      )}
    </div>
  );
}
