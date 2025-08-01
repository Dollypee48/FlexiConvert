import React from "react";
import { Link } from "react-router-dom";
import {
  FileJson,
  Table,
  FileText,
  FileCode,
  Database,
  FileSpreadsheet,
  FileSignature,
  ClipboardList,
} from "lucide-react";
import { motion } from "framer-motion";

const converters = [
  {
    label: "JSON to CSV",
    path: "json-to-csv",
    icon: <FileJson className="text-blue-700" />,
  },
  {
    label: "CSV to Excel",
    path: "csv-to-excel",
    icon: <FileSpreadsheet className="text-green-600" />,
  },
  {
    label: "CSV to SQL",
    path: "csv-to-sql",
    icon: <Table className="text-purple-600" />,
  },
  {
    label: "JSON to SQL",
    path: "json-to-sql",
    icon: <Database className="text-red-600" />,
  },
  {
    label: "JSON to XML/YAML",
    path: "json-to-xml-yaml",
    icon: <FileCode className="text-yellow-600" />,
  },
  {
    label: "Markdown to HTML",
    path: "markdown-to-html",
    icon: <FileText className="text-pink-600" />,
  },
  {
    label: "Text to Base64",
    path: "text-to-base64",
    icon: <FileSignature className="text-amber-500" />,
  },
  {
    label: "Excel to JSON",
    path: "excel-to-json",
    icon: <ClipboardList className="text-sky-500" />,
  },
];

export default function ConverterPage() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-20 px-4">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-extrabold text-blue-800"
        >
          Convert Smarter, Faster.
        </motion.h2>
        <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
          Choose from our collection of powerful file format converters. Each tool is built for speed, simplicity, and accuracy.
        </p>
        <Link
          to="/"
          className="inline-block mt-6 text-white bg-blue-700 hover:bg-blue-800 transition px-6 py-2 rounded-full font-medium"
        >
          ← Back to Home
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
      >
        {converters.map(({ label, path, icon }) => (
          <Link
            key={label}
            to={`/convert/${path}`}
            className="bg-white border border-blue-100 p-6 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition duration-200"
          >
            <div className="mb-4 text-4xl">{icon}</div>
            <h3 className="text-xl font-semibold text-gray-800">{label}</h3>
            <p className="text-sm text-gray-500 mt-1">Quick and accurate</p>
          </Link>
        ))}
      </motion.div>

      <div className="text-center mt-20 text-gray-500 text-sm">
        Powered by Dollypee • © {new Date().getFullYear()}
      </div>
    </section>
  );
}
