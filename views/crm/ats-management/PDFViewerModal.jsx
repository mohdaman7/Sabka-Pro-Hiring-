"use client";

import { X, Download, Maximize2, ZoomIn, ZoomOut } from "lucide-react";
import { useState } from "react";

export default function PDFViewerModal({ pdfUrl, onClose }) {
  const [zoom, setZoom] = useState(100);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full h-full max-w-7xl max-h-[95vh] m-4 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border-2 border-indigo-500/30 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b-2 border-indigo-500/30">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Maximize2 className="w-6 h-6 text-indigo-400" />
            PDF Viewer
          </h2>
          
          <div className="flex items-center gap-2">
            {/* Zoom Controls */}
            <button
              onClick={() => setZoom(Math.max(50, zoom - 10))}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-indigo-500/50 transition-all"
              title="Zoom Out"
            >
              <ZoomOut className="w-5 h-5 text-white" />
            </button>
            
            <span className="text-white font-semibold min-w-[60px] text-center">
              {zoom}%
            </span>
            
            <button
              onClick={() => setZoom(Math.min(200, zoom + 10))}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-indigo-500/50 transition-all"
              title="Zoom In"
            >
              <ZoomIn className="w-5 h-5 text-white" />
            </button>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="p-2 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 border border-emerald-400 transition-all hover:scale-105"
              title="Download PDF"
            >
              <Download className="w-5 h-5 text-white" />
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-red-600 hover:bg-red-500 border border-red-400 transition-all hover:scale-105"
              title="Close"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* PDF Content */}
        <div className="flex-1 overflow-auto p-4 bg-slate-950/50">
          <div className="flex items-center justify-center min-h-full">
            <iframe
              src={`${pdfUrl}#zoom=${zoom}`}
              className="w-full h-full min-h-[600px] rounded-xl border-2 border-white/10 bg-white"
              title="PDF Viewer"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t-2 border-indigo-500/30 bg-slate-900/50">
          <p className="text-white/60 text-sm text-center">
            Press <kbd className="px-2 py-1 rounded bg-white/10 text-white font-mono text-xs">ESC</kbd> to close
          </p>
        </div>
      </div>
    </div>
  );
}
