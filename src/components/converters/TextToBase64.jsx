import React, { useState } from "react";
import { Copy, Download, Repeat } from "lucide-react";

export default function TextToBase64() {
  const [text, setText] = useState("");
  const [base64, setBase64] = useState("");
  const [isEncoded, setIsEncoded] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    try {
      if (isEncoded) {
        setBase64(btoa(text));
      } else {
        setText(atob(base64));
      }
    } catch {
      alert("❌ Invalid input for conversion.");
    }
  };

  const handleCopy = () => {
    const output = isEncoded ? base64 : text;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([isEncoded ? base64 : text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = isEncoded ? "base64.txt" : "decoded.txt";
    document.body.appendChild(a);
    a.click();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-3xl bg-gradient-to-tr from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 shadow-2xl">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600">
          FlexiConvert – {isEncoded ? "Text ⇨ Base64" : "Base64 ⇨ Text"}
        </h1>
        <p className="text-gray-500 dark:text-gray-300 mt-1 text-sm">
          Instantly encode or decode Base64 with a single click.
        </p>
      </header>

      <div className="mb-6">
        <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
          📥 {isEncoded ? "Input Text" : "Input Base64"}
        </label>
        <textarea
          className="w-full h-44 p-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
          placeholder={
            isEncoded
              ? "Paste plain text to encode..."
              : "Paste Base64 string to decode..."
          }
          value={isEncoded ? text : base64}
          onChange={(e) =>
            isEncoded ? setText(e.target.value) : setBase64(e.target.value)
          }
        />
      </div>

      <div className="flex justify-between items-center mb-8">
        <button
          onClick={handleConvert}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-700 to-teal-700 hover:from-purple-600 hover:to-teal-800 text-white font-semibold transition shadow-md hover:shadow-lg"
        >
          Convert
        </button>

        <button
          onClick={() => setIsEncoded(!isEncoded)}
          className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium hover:underline transition text-sm"
        >
          <Repeat size={16} />
          {isEncoded ? "Switch to Base64 ⇨ Text" : "Switch to Text ⇨ Base64"}
        </button>
      </div>

      <div>
        <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
          📤 Output
        </label>
        <div className="relative">
          <textarea
            readOnly
            className="w-full h-48 p-4 text-sm rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-100 font-mono"
            value={isEncoded ? base64 : text}
            placeholder="Result will appear here..."
          />
          <div className="absolute top-3 right-3 flex gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-3 py-1.5 bg-gray-800 text-white text-xs font-semibold rounded-md hover:bg-gray-900 transition"
            >
              <Copy size={14} />
              {copied ? "Copied!" : "Copy"}
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1 px-3 py-1.5 bg-gray-800 text-white text-xs font-semibold rounded-md hover:bg-gray-900 transition"
            >
              <Download size={14} />
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
