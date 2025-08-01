import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Code, FileText, RefreshCw } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0a1d42] via-[#1e2d5c] to-[#0a1d42] text-white">
      
    
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-bold mb-4"
          >
            Welcome to FlexiConvert
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-blue-100 mb-8"
          >
            Convert JSON, CSV, Excel, SQL, Markdown, and more instantly and securely in your browser.
          </motion.p>
          <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
            <Link
              to="/convert"
              className="bg-blue-400 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Explore FlexiConvert
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Feature Highlights Section */}
      <section className="py-16 px-4 bg-white text-gray-800 shadow-inner">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="flex justify-center mb-3">
              <FileText size={36} className="text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Multi-format Support</h3>
            <p className="text-sm text-gray-600">
              Convert between JSON, CSV, Excel, SQL, Markdown, and more.
            </p>
          </div>

          <div>
            <div className="flex justify-center mb-3">
              <Code size={36} className="text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Developer-Friendly</h3>
            <p className="text-sm text-gray-600">
              Clean UI with developer-first features and instant preview.
            </p>
          </div>

          <div>
            <div className="flex justify-center mb-3">
              <RefreshCw size={36} className="text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure & Fast</h3>
            <p className="text-sm text-gray-600">
              All conversions happen in-browser — no data is stored or sent.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-[#0a1d42] text-white text-center border-t border-blue-900">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Start Converting Instantly</h2>
          <p className="mb-6 text-lg">
            No login. No wait. Just fast, simple file and data conversions in one place.
          </p>
          <Link
            to="/convert"
            className="bg-white text-[#0a1d42] font-semibold px-6 py-3 rounded-lg hover:bg-blue-100 transition"
          >
            Launch FlexiConvert Suite
          </Link>
        </div>
      </section>
    </main>
  );
}
