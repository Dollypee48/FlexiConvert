
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import ConverterPage from '../pages/ConverterPage';
import JsonToCsv from '../components/converters/JsonToCsv';
import CsvToExcel from '../components/converters/CsvToExcel';
import CsvToSql from '../components/converters/CsvToSql';
import JsonToSql from '../components/converters/JsonToSql';
import JsonToXmlYaml from '../components/converters/JsonToXmlYaml';
import MarkdownToHtml from '../components/converters/MarkdownToHtml';
import TextToBase64 from '../components/converters/TextToBase64';
import ExcelToJson from '../components/converters/ExcelToJson';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/convert" element={<ConverterPage />} />
      <Route path="/convert/json-to-csv" element={<JsonToCsv />} />
      <Route path="/convert/csv-to-excel" element={<CsvToExcel />} />
      <Route path="/convert/csv-to-sql" element={<CsvToSql />} />
      <Route path="/convert/json-to-sql" element={<JsonToSql />} />
      <Route path="/convert/json-to-xml-yaml" element={<JsonToXmlYaml />} />
      <Route path="/convert/markdown-to-html" element={<MarkdownToHtml />} />
      <Route path="/convert/text-to-base64" element={<TextToBase64 />} />
      <Route path="/convert/excel-to-json" element={<ExcelToJson />} />
    </Routes>
  );
}
