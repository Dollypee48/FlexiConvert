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
      setHtml("<p class='text-red-500'>Error converting Markdown to HTML</p>");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(html);
    alert("✅ HTML copied to clipboard!");
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="bg-white dark:bg-gray-900 shadow-xl rounded-3xl p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600">
          Markdown to HTML Converter
        </h2>

        <textarea
          className="w-full h-48 p-4 text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 mb-6 resize-none"
          placeholder="Write your Markdown here..."
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
        />

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6">
          <button
            onClick={convertToHtml}
            className="w-full sm:w-auto bg-indigo-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            🔄 Convert to HTML
          </button>
          {html && (
            <button
              onClick={handleCopy}
              className="w-full sm:w-auto bg-green-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              📋 Copy HTML
            </button>
          )}
        </div>

        {html && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-3">
              🔍 Preview
            </h3>
            <div className="p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-x-auto max-h-[400px] prose dark:prose-invert">
              <div dangerouslySetInnerHTML={{ __html: html }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
