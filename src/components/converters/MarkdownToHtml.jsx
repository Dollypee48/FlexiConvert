import React, { useState } from "react";
import { marked } from "marked";

export default function MarkdownToHtml() {
  const [markdown, setMarkdown] = useState("");
  const [html, setHtml] = useState("");

  const convertToHtml = () => {
    try {
      const result = marked.parse(markdown);
      setHtml(result);
    } catch (err) {
      setHtml("<p>Error converting Markdown to HTML</p>");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(html);
    alert("✅ HTML copied to clipboard!");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Markdown ⇄ HTML Converter</h2>

      <textarea
        className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 mb-4"
        placeholder="Write your Markdown here..."
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
      />

      <button
        className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition duration-300"
        onClick={convertToHtml}
      >
        Convert to HTML
      </button>

      {html && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-semibold text-gray-700">Converted HTML</h3>
            <button
              onClick={handleCopy}
              className="text-sm text-white bg-green-600 px-3 py-1 rounded hover:bg-green-700 transition"
            >
              Copy HTML
            </button>
          </div>

          <div className="p-4 bg-gray-100 border border-gray-300 rounded-lg overflow-x-auto max-h-96">
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </div>
      )}
    </div>
  );
}
