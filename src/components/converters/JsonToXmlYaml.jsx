import React, { useState } from "react";
import yaml from "js-yaml";
import { Copy, Download } from "lucide-react";

export default function JsonToXmlYaml() {
  const [jsonInput, setJsonInput] = useState("");
  const [output, setOutput] = useState("");
  const [format, setFormat] = useState("xml");
  const [copied, setCopied] = useState(false);

  const convertJson = () => {
    try {
      const jsonObj = JSON.parse(jsonInput);

      if (format === "xml") {
        let xml = "<root>";
        for (const key in jsonObj) {
          xml += `<${key}>${jsonObj[key]}</${key}>`;
        }
        xml += "</root>";
        setOutput(xml);
      } else {
        const yamlStr = yaml.dump(jsonObj);
        setOutput(yamlStr);
      }
    } catch (err) {
      setOutput("❌ Invalid JSON");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `converted.${format === "yaml" ? "yaml" : "xml"}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Convert JSON to {format.toUpperCase()}
      </h2>

      <div className="mb-4 flex items-center justify-between gap-4">
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="xml">XML</option>
          <option value="yaml">YAML</option>
        </select>
        <button
          onClick={convertJson}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Convert
        </button>
      </div>

      <textarea
        rows={8}
        className="w-full border border-gray-300 p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
        placeholder="Paste your JSON here..."
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />

      <div className="flex justify-end gap-4 mb-2">
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
        >
          <Copy size={16} /> {copied ? "Copied!" : "Copy"}
        </button>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm rounded"
        >
          <Download size={16} /> Download
        </button>
      </div>

      <pre className="w-full bg-gray-100 border border-gray-300 rounded p-3 text-sm whitespace-pre-wrap overflow-x-auto">
        {output}
      </pre>
    </div>
  );
}
