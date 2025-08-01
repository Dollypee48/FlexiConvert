import React from "react";

const About = () => {
  return (
    <div className="bg-[#0a1d42] min-h-screen text-white py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">About FlexiConvert</h1>

        <p className="mb-6 text-lg text-gray-200">
          <strong>FlexiConvert</strong> is a professional, flexible, and user-friendly data conversion toolkit
          designed to streamline how developers, analysts, and everyday users work with different file formats. 
          Whether it's JSON, CSV, SQL, Excel, Markdown, or Base64 — FlexiConvert delivers speed, precision, and simplicity.
        </p>

        <div className="bg-white/10 p-6 rounded-xl shadow mb-8">
          <h2 className="text-2xl font-semibold mb-3">💡 What is FlexiConvert?</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-200">
            <li>Convert JSON to CSV, SQL, XML, or YAML</li>
            <li>Convert CSV to Excel or SQL</li>
            <li>Extract structured JSON from Excel files</li>
            <li>Transform Markdown to clean HTML</li>
            <li>Encode and decode text using Base64</li>
            <li>...and more — all in one sleek platform</li>
          </ul>
        </div>

        <div className="bg-white/10 p-6 rounded-xl shadow mb-8">
          <h2 className="text-2xl font-semibold mb-3">🎯 Who is it for?</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-200">
            <li><strong>Developers</strong> who want fast, reliable conversions during builds or testing.</li>
            <li><strong>Data analysts</strong> managing complex data from varied sources.</li>
            <li><strong>Students & educators</strong> exploring structured data formats.</li>
            <li><strong>Anyone</strong> needing secure, client-side file transformations.</li>
          </ul>
        </div>

        <div className="bg-white/10 p-6 rounded-xl shadow mb-8">
          <h2 className="text-2xl font-semibold mb-3">✨ Why FlexiConvert?</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-200">
            <li>✅ All-in-One Converter – Centralized, convenient, and versatile</li>
            <li>⚡ Real-time Preview – Instantly view output while typing</li>
            <li>🎨 Clean, Intuitive UI – Designed for clarity and responsiveness</li>
            <li>🔒 Privacy Focused – No file uploads, no server processing</li>
            <li>📥 Easy Export – Copy or download results in one click</li>
          </ul>
        </div>

        <div className="bg-white/10 p-6 rounded-xl shadow">
          <h2 className="text-2xl font-semibold mb-3">🔧 Built With</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-200">
            <li><strong>React.js</strong> – For blazing-fast interactivity</li>
            <li><strong>Tailwind CSS</strong> – For elegant and flexible styling</li>
            <li><strong>Powerful open-source tools</strong> – For parsing, encoding, and converting formats</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
