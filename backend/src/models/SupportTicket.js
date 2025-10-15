import mongoose from "mongoose";

const { Schema } = mongoose;

const supportTicketSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    role: { type: String, enum: ["student", "employer", "admin"], required: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ["account", "jobs", "courses", "technical", "billing", "other"],
      default: "other",
      index: true,
    },
    priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
    status: { type: String, enum: ["open", "in_progress", "resolved", "closed"], default: "open", index: true },
  },
  { timestamps: true }
);

supportTicketSchema.index({ userId: 1, createdAt: -1 });

export const SupportTicketModel = mongoose.model("SupportTicket", supportTicketSchema);
