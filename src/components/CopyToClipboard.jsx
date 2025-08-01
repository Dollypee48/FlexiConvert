import React from "react";

export default function CopyToClipboard({ text, className = "" }) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard!");
    } catch (err) {
      alert("Failed to copy");
      console.error(err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded ${className}`}
    >
      Copy to Clipboard
    </button>
  );
}
