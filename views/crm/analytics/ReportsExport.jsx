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
    <div className="space-y-6 text-white">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/8 rounded-2xl p-8 border border-white/15 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-4 mb-4">
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center border border-white/20 shadow-inner"
            style={{ background: "linear-gradient(135deg, rgba(128,55,145,0.85), rgba(184,123,209,0.65))" }}
          >
            <Download className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">Export Reports</h2>
            <p className="text-white/70 mt-1">Download your analytics data in your preferred format</p>
          </div>
        </div>
      </motion.div>

      {/* Report Selection */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/8 rounded-2xl p-6 border border-white/15 shadow-xl backdrop-blur-md">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-purple-300" />
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
                className={`relative p-4 rounded-xl border transition-all duration-300 text-left ${
                  isSelected
                    ? "border-white/40 bg-white/15"
                    : "border-white/12 bg-white/6 hover:border-white/25"
                }`}
              >
                {isSelected && (
                  <div className="absolute -top-2 -right-2">
                    <CheckCircle className="w-6 h-6 text-purple-300 bg-white/20 rounded-full" />
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0 border border-white/15">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white">
                      {report.name}
                    </p>
                    <p className="text-xs text-white/60 mt-1">{report.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Format Selection */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/8 rounded-2xl p-6 border border-white/15 shadow-xl backdrop-blur-md">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <FileSpreadsheet className="w-5 h-5 text-purple-300" />
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
                className={`relative p-5 rounded-xl border transition-all duration-300 text-left ${
                  isSelected
                    ? "border-white/40 bg-white/15"
                    : "border-white/12 bg-white/6 hover:border-white/25"
                }`}
              >
                {isSelected && (
                  <div className="absolute -top-2 -right-2">
                    <CheckCircle className="w-6 h-6 text-purple-300 bg-white/20 rounded-full" />
                  </div>
                )}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center border border-white/15">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-lg text-white">
                      {format.name}
                    </p>
                    <p className="text-sm text-white/60">{format.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Date Range */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/8 rounded-2xl p-6 border border-white/15 shadow-xl backdrop-blur-md">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-purple-300" />
          Date Range (Optional)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Start Date</label>
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/10 text-white focus:border-white/40 focus:outline-none transition-colors placeholder-white/40"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">End Date</label>
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/10 text-white focus:border-white/40 focus:outline-none transition-colors placeholder-white/40"
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
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/8 rounded-2xl p-6 border border-white/15 shadow-xl backdrop-blur-md">
        <div className="flex items-start gap-4">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border border-white/20"
            style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.8), rgba(99,102,241,0.6))" }}
          >
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-white mb-2">Export Information</h4>
            <ul className="space-y-1 text-sm text-white/70">
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
