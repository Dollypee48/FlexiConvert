import React, { useState } from "react";

export default function TextToBase64() {
  const [text, setText] = useState("");
  const [base64, setBase64] = useState("");
  const [isEncoded, setIsEncoded] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    try {
      if (isEncoded) {
        const encoded = btoa(text);
        setBase64(encoded);
      } else {
        const decoded = atob(base64);
        setText(decoded);
      }
    } catch (err) {
      alert("Invalid input for conversion.");
    }
  };

  const handleCopy = () => {
    const output = isEncoded ? base64 : text;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([isEncoded ? base64 : text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = isEncoded ? "base64.txt" : "decoded.txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-6 space-y-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        {isEncoded ? "Text ➜ Base64 Converter" : "Base64 ➜ Text Decoder"}
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          {isEncoded ? "Enter Text" : "Enter Base64"}
        </label>
        <textarea
          rows={6}
          value={isEncoded ? text : base64}
          onChange={(e) =>
            isEncoded ? setText(e.target.value) : setBase64(e.target.value)
          }
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
          placeholder={
            isEncoded ? "Type or paste plain text..." : "Paste Base64 string..."
          }
        />
      </div>

      <button
        onClick={handleConvert}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
      >
        Convert
      </button>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Output
        </label>
        <textarea
          rows={6}
          readOnly
          value={isEncoded ? base64 : text}
          className="w-full p-3 border border-gray-200 bg-gray-50 rounded-lg text-sm resize-none"
          placeholder="Your result will appear here..."
        />
      </div>

      <div className="flex justify-between items-center gap-3 text-sm">
        <button
          onClick={handleCopy}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
        <button
          onClick={handleDownload}
          className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          Download .txt
        </button>
        <button
          onClick={() => setIsEncoded(!isEncoded)}
          className="ml-auto text-blue-600 hover:underline font-medium"
        >
          Switch to {isEncoded ? "Base64 ➜ Text" : "Text ➜ Base64"}
        </button>
      </div>
    </div>
  );
}
