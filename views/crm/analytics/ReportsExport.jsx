"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, FileText, FileSpreadsheet, Calendar, Filter, CheckCircle } from "lucide-react";
import { exportReport } from "@/services/analyticsService";
import { customToast } from "@/components/ui/toast";

export default function ReportsExport({ filters }) {
  const [loading, setLoading] = useState(false);
  const [selectedReport, setSelectedReport] = useState("overview");
  const [selectedFormat, setSelectedFormat] = useState("json");
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });

  const reportTypes = [
    { id: "overview", name: "Overview Dashboard", description: "Complete KPIs and metrics", icon: FileText, color: "blue" },
    { id: "leads", name: "Lead Conversion", description: "Funnel and performance data", icon: FileText, color: "purple" },
    { id: "revenue", name: "Revenue Reports", description: "Income and payment details", icon: FileText, color: "emerald" },
    { id: "placements", name: "Placement Analytics", description: "Student success metrics", icon: FileText, color: "orange" },
    { id: "employers", name: "Employer Engagement", description: "Activity and job statistics", icon: FileText, color: "rose" },
    { id: "courses", name: "Course Analytics", description: "Training performance data", icon: FileText, color: "cyan" },
    { id: "staff", name: "Staff Performance", description: "Team metrics and KPIs", icon: FileText, color: "indigo" },
  ];

  const formats = [
    { id: "json", name: "JSON", description: "Machine-readable format", icon: FileText },
    { id: "csv", name: "CSV", description: "Excel-compatible spreadsheet", icon: FileSpreadsheet },
  ];

  const handleExport = async () => {
    try {
      setLoading(true);
      await exportReport(selectedReport, selectedFormat, {
        ...filters,
        ...dateRange,
      });
      customToast.success("Export Successful", `${reportTypes.find(r => r.id === selectedReport)?.name} exported successfully!`);
    } catch (error) {
      console.error("Export error:", error);
      customToast.error("Export Failed", "Failed to export report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl border-2 border-indigo-500/30">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Download className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">Export Reports</h2>
            <p className="text-indigo-100 mt-1">Download your analytics data in your preferred format</p>
          </div>
        </div>
      </motion.div>

      {/* Report Selection */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-indigo-600/20 rounded-2xl p-6 shadow-lg border-2 border-indigo-500/30 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-indigo-100 mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-purple-400" />
          Select Report Type
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reportTypes.map((report) => {
            const Icon = report.icon;
            const isSelected = selectedReport === report.id;
            return (
              <button
                key={report.id}
                onClick={() => setSelectedReport(report.id)}
                className={`relative p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                  isSelected
                    ? `border-${report.color}-500 bg-${report.color}-50`
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                {isSelected && (
                  <div className="absolute -top-2 -right-2">
                    <CheckCircle className={`w-6 h-6 text-${report.color}-600 bg-white rounded-full`} />
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-${report.color}-100 flex items-center justify-center shrink-0`}>
                    <Icon className={`w-5 h-5 text-${report.color}-600`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold ${isSelected ? `text-${report.color}-900` : "text-gray-900"}`}>
                      {report.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{report.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Format Selection */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-indigo-600/20 rounded-2xl p-6 shadow-lg border-2 border-indigo-500/30 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-indigo-100 mb-4 flex items-center gap-2">
          <FileSpreadsheet className="w-5 h-5 text-purple-400" />
          Select Format
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formats.map((format) => {
            const Icon = format.icon;
            const isSelected = selectedFormat === format.id;
            return (
              <button
                key={format.id}
                onClick={() => setSelectedFormat(format.id)}
                className={`relative p-5 rounded-xl border-2 transition-all duration-300 text-left ${
                  isSelected
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                {isSelected && (
                  <div className="absolute -top-2 -right-2">
                    <CheckCircle className="w-6 h-6 text-purple-600 bg-white rounded-full" />
                  </div>
                )}
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg ${isSelected ? "bg-purple-100" : "bg-gray-100"} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${isSelected ? "text-purple-600" : "text-gray-600"}`} />
                  </div>
                  <div>
                    <p className={`font-bold text-lg ${isSelected ? "text-purple-900" : "text-gray-900"}`}>
                      {format.name}
                    </p>
                    <p className="text-sm text-gray-500">{format.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Date Range */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-purple-600" />
          Date Range (Optional)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
            />
          </div>
        </div>
      </motion.div>

      {/* Export Button */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center">
        <button
          onClick={handleExport}
          disabled={loading}
          className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Exporting...
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              Export Report
            </>
          )}
        </button>
      </motion.div>

      {/* Info Box */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-200">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">Export Information</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• JSON format is ideal for API integration and data processing</li>
              <li>• CSV format can be opened in Excel, Google Sheets, or any spreadsheet software</li>
              <li>• Date range is optional - leave blank to export all available data</li>
              <li>• Large exports may take a few seconds to generate</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
