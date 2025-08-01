import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function DownloadAsPDF({ targetId, fileName = "converted.pdf", className = "" }) {
  const handleDownload = async () => {
    const input = document.getElementById(targetId);
    if (!input) {
      alert("Content not found!");
      return;
    }

    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save(fileName);
  };

  return (
    <button
      onClick={handleDownload}
      className={`bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded ${className}`}
    >
      Download as PDF
    </button>
  );
}
