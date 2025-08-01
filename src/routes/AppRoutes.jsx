import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About'
import ConverterPage from '../pages/ConverterPage';
import JsonToCsv from '../components/converters/JsonToCsv';
import CsvToExcel from '../components/converters/CsvToExcel';
import CsvToSql from '../components/converters/CsvToSql';
import JsonToSql from '../components/converters/JsonToSql';
import JsonToXmlYaml from '../components/converters/JsonToXmlYaml';
import MarkdownToHtml from '../components/converters/MarkdownToHtml';
import TextToBase64 from '../components/converters/TextToBase64';
import ExcelToJson from '../components/converters/ExcelToJson';

const withBackground = (Component) => (
  <div className="min-h-screen bg-blue-200 py-10 px-4">
    <Component />
  </div>
);

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About/>} />
      <Route path="/convert" element={withBackground(ConverterPage)} />
      <Route path="/convert/json-to-csv" element={withBackground(JsonToCsv)} />
      <Route path="/convert/csv-to-excel" element={withBackground(CsvToExcel)} />
      <Route path="/convert/csv-to-sql" element={withBackground(CsvToSql)} />
      <Route path="/convert/json-to-sql" element={withBackground(JsonToSql)} />
      <Route path="/convert/json-to-xml-yaml" element={withBackground(JsonToXmlYaml)} />
      <Route path="/convert/markdown-to-html" element={withBackground(MarkdownToHtml)} />
      <Route path="/convert/text-to-base64" element={withBackground(TextToBase64)} />
      <Route path="/convert/excel-to-json" element={withBackground(ExcelToJson)} />
    </Routes>
  );
}
