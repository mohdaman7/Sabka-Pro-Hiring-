import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import path from "path";
import { fileURLToPath } from "url";
import { env } from "./config/env.js";
import { connectToDatabase } from "./config/db.js";
import { errorHandler } from "./middleware/error.js";
import { notFound } from "./middleware/notFound.js";
import authRoutes from "./routes/auth.js";
import jobRoutes from "./routes/jobs.js";
import applicationRoutes from "./routes/applications.js";
import crmRoutes from "./routes/crm.js";
import leadRoutes from "./routes/leads.js";
import studentRoutes from "./routes/student.js";
import employerRoutes from "./routes/employer.js";
import interviewRoutes from "./routes/interviews.js";
import { InterviewModel } from "./models/Interview.js";
import { sendInterviewReminder } from "./utils/mailer.js";
import userRoutes from "./routes/user.js";

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: "Too many requests from this IP, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// More strict rate limiting for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs for auth
  message: {
    success: false,
    message: "Too many authentication attempts, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

async function bootstrap() {
  try {
    console.log("🚀 Starting server initialization...");
    console.log("📦 Connecting to MongoDB...");

    await connectToDatabase(env.mongoUri);
    console.log("✅ Connected to MongoDB successfully!");

    const app = express();

    // Security middleware
    app.use(
      helmet({
        crossOriginResourcePolicy: { policy: "cross-origin" },
      })
    );

    // CORS configuration
    app.use(
      cors({
        origin: env.corsOrigin || true,
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
      })
    );

    // Static and body parsing middleware
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const uploadsDir = path.resolve(__dirname, "..", "uploads");
    app.use("/uploads", express.static(uploadsDir));
    app.use(express.json({ limit: "10mb" }));
    app.use(express.urlencoded({ extended: true, limit: "10mb" }));

    // Logging
    if (env.nodeEnv === "development") {
      app.use(morgan("dev"));
    } else {
      app.use(morgan("combined"));
    }

    // Apply rate limiting to all routes
    app.use(limiter);

    // Health check endpoint
    app.get("/health", (_req, res) => {
      res.status(200).json({
        success: true,
        message: "Server is running healthy!",
        timestamp: new Date().toISOString(),
        environment: env.nodeEnv,
      });
    });

    // API status endpoint
    app.get("/", (_req, res) => {
      res.json({
        success: true,
        message: "🎯 Job Board API is running!",
        version: "1.0.0",
        environment: env.nodeEnv,
        timestamp: new Date().toISOString(),
        documentation: "/api/docs", // You can add API documentation later
      });
    });

    // API routes with rate limiting for auth
    app.use("/api/auth", authRoutes);
    app.use("/api/jobs", jobRoutes);
    app.use("/api/applications", applicationRoutes);
    app.use("/api/admin", crmRoutes); // Changed from /api/crm to /api/admin for better semantics
    app.use("/api/leads", leadRoutes);
    app.use("/api/student", studentRoutes);
    app.use("/api/employer", employerRoutes);
    app.use("/api/interviews", interviewRoutes);
    app.use("/api/user", userRoutes);

    // API documentation route (you can implement Swagger later)
    app.get("/api/docs", (_req, res) => {
      res.json({
        success: true,
        message: "API Documentation",
        endpoints: {
          auth: "/api/auth",
          jobs: "/api/jobs",
          applications: "/api/applications",
          admin: "/api/admin",
          leads: "/api/leads",
          student: "/api/student",
          employer: "/api/employer",
          user: "/api/user",
        },
      });
    });

    // Handle preflight requests
    app.options("*", cors());

    // 404 handler for undefined routes
    app.use(notFound);

    // Global error handler (should be last)
    app.use(errorHandler);

    // Graceful shutdown handling
    process.on("SIGTERM", () => {
      console.log("SIGTERM received, shutting down gracefully");
      process.exit(0);
    });

    process.on("SIGINT", () => {
      console.log("SIGINT received, shutting down gracefully");
      process.exit(0);
    });

    const server = app.listen(env.port, () => {
      console.log(`🎉 Server started successfully!`);
      console.log(`📍 Environment: ${env.nodeEnv}`);
      console.log(`🚀 API listening on http://localhost:${env.port}`);
      console.log(
        `📚 API Documentation: http://localhost:${env.port}/api/docs`
      );
      console.log(`❤️  Health check: http://localhost:${env.port}/health`);
    });

    // Handle server errors
    server.on("error", (error) => {
      console.error("❌ Server error:", error);
      process.exit(1);
    });

    // Lightweight reminder scheduler (runs every 60 seconds)
    const REMINDER_INTERVAL_MS = 60 * 1000;
    setInterval(async () => {
      try {
        const now = new Date();
        const in1Hour = new Date(now.getTime() + 60 * 60 * 1000);
        const in24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);

        // 24-hour reminders
        const due24h = await InterviewModel.find({
          status: { $in: ["scheduled", "rescheduled"] },
          startTime: { $gte: now, $lte: in24Hours },
          "reminders.oneDaySent": false,
        }).populate("studentId", "firstName lastName email");

        for (const iv of due24h) {
          await sendInterviewReminder({
            to: [iv.studentId.email, ...(iv.panel || []).map((p) => p.email)],
            interview: iv,
            windowLabel: "24 hours",
          });
          await InterviewModel.updateOne({ _id: iv._id }, { $set: { "reminders.oneDaySent": true } });
        }

        // 1-hour reminders
        const due1h = await InterviewModel.find({
          status: { $in: ["scheduled", "rescheduled"] },
          startTime: { $gte: now, $lte: in1Hour },
          "reminders.oneHourSent": false,
        }).populate("studentId", "firstName lastName email");

        for (const iv of due1h) {
          await sendInterviewReminder({
            to: [iv.studentId.email, ...(iv.panel || []).map((p) => p.email)],
            interview: iv,
            windowLabel: "1 hour",
          });
          await InterviewModel.updateOne({ _id: iv._id }, { $set: { "reminders.oneHourSent": true } });
        }
      } catch (schedulerErr) {
        console.error("Reminder scheduler error:", schedulerErr?.message || schedulerErr);
      }
    }, REMINDER_INTERVAL_MS);
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

// Start the application
bootstrap();
