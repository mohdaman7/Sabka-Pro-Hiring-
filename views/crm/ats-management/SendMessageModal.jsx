"use client";

import { X, Send, Mail, MessageSquare, Smartphone } from "lucide-react";
import { useState } from "react";
import { atsManagementService } from "@/services/atsManagementService";

export default function SendMessageModal({ application, onClose, onSent }) {
  const [messageType, setMessageType] = useState("email");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) {
      alert("Please enter a message");
      return;
    }

    if (messageType === "email" && !subject.trim()) {
      alert("Please enter a subject for email");
      return;
    }

    try {
      setSending(true);
      await atsManagementService.sendMessage(application._id, {
        type: messageType,
        subject: messageType === "email" ? subject : undefined,
        message,
        recipientEmail: application.email || application.studentId?.email,
        recipientPhone: application.phone || application.studentId?.phone,
      });
      
      alert(`${messageType.toUpperCase()} sent successfully!`);
      onSent();
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border-2 border-blue-500/30 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-2 border-blue-500/30">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Send className="w-7 h-7 text-blue-400" />
            Send Message
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-red-600 hover:bg-red-500 transition-all hover:scale-110"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Recipient Info */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-white/60 text-sm mb-2">Sending to:</p>
            <p className="text-white font-bold text-lg">
              {application.candidateName || `${application.studentId?.firstName} ${application.studentId?.lastName}`}
            </p>
            <p className="text-white/70 text-sm mt-1">
              {application.email || application.studentId?.email}
            </p>
          </div>

          {/* Message Type Selection */}
          <div>
            <label className="text-white font-semibold mb-3 block">Message Type</label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setMessageType("email")}
                className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-2 ${
                  messageType === "email"
                    ? "bg-gradient-to-br from-blue-600 to-cyan-600 border-blue-400 shadow-lg scale-105"
                    : "bg-white/5 border-white/10 hover:border-blue-500/50 hover:bg-white/10"
                }`}
              >
                <Mail className="w-6 h-6 text-white" />
                <span className="text-white font-semibold text-sm">Email</span>
              </button>

              <button
                onClick={() => setMessageType("sms")}
                className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-2 ${
                  messageType === "sms"
                    ? "bg-gradient-to-br from-green-600 to-emerald-600 border-green-400 shadow-lg scale-105"
                    : "bg-white/5 border-white/10 hover:border-green-500/50 hover:bg-white/10"
                }`}
              >
                <Smartphone className="w-6 h-6 text-white" />
                <span className="text-white font-semibold text-sm">SMS</span>
              </button>

              <button
                onClick={() => setMessageType("whatsapp")}
                className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-2 ${
                  messageType === "whatsapp"
                    ? "bg-gradient-to-br from-purple-600 to-pink-600 border-purple-400 shadow-lg scale-105"
                    : "bg-white/5 border-white/10 hover:border-purple-500/50 hover:bg-white/10"
                }`}
              >
                <MessageSquare className="w-6 h-6 text-white" />
                <span className="text-white font-semibold text-sm">WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Subject (Email only) */}
          {messageType === "email" && (
            <div>
              <label className="text-white font-semibold mb-2 block">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-4 rounded-xl bg-white/5 border-2 border-white/10 focus:border-blue-500 text-white placeholder-white/40"
                placeholder="Enter email subject..."
              />
            </div>
          )}

          {/* Message */}
          <div>
            <label className="text-white font-semibold mb-2 block">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              className="w-full p-4 rounded-xl bg-white/5 border-2 border-white/10 focus:border-blue-500 text-white placeholder-white/40 resize-none"
              placeholder={`Enter your ${messageType} message...`}
            />
          </div>

          {/* Template Suggestions */}
          <div className="flex flex-wrap gap-2">
            <p className="text-white/60 text-sm w-full mb-1">Quick Templates:</p>
            <button
              onClick={() => setMessage("Thank you for your application. We will review it and get back to you soon.")}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white text-sm transition-all"
            >
              Application Received
            </button>
            <button
              onClick={() => setMessage("Congratulations! You have been shortlisted for the next round.")}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white text-sm transition-all"
            >
              Shortlisted
            </button>
            <button
              onClick={() => setMessage("We would like to schedule an interview with you. Please let us know your availability.")}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white text-sm transition-all"
            >
              Interview Request
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t-2 border-blue-500/30">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border-2 border-white/10 text-white font-semibold transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={sending}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-2"
          >
            {sending ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Sending...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Send {messageType.toUpperCase()}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
