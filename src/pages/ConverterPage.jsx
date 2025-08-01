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
    <section className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-black px-6 py-24">
      <div className="max-w-4xl mx-auto text-center mb-20">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent tracking-tight"
        >
          Convert Smarter, Faster.
        </motion.h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl mt-4 max-w-2xl mx-auto leading-relaxed">
          Choose from our elegant collection of powerful converters. Built for clarity, precision, and speed.
        </p>
        <Link
          to="/"
          className="inline-block mt-8 text-white bg-blue-700 hover:bg-blue-800 transition px-6 py-2 rounded-full font-semibold shadow-md hover:shadow-lg"
        >
          ← Back to Home
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl mx-auto"
      >
        {converters.map(({ label, path, icon }) => (
          <motion.div
            key={label}
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 280 }}
          >
            <Link
              to={`/convert/${path}`}
              className="flex flex-col items-center text-center bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 backdrop-blur-lg rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="mb-4 text-5xl">{icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{label}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Quick and accurate</p>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-24 text-center text-sm text-gray-500 dark:text-gray-400">
        Made with ❤️ by <span className="font-semibold text-blue-700">Dollypee</span> • © {new Date().getFullYear()}
      </div>
    </section>
  );
}
