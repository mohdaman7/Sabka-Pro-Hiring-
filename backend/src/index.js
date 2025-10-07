import express from "express";
import cors from "cors";
import morgan from "morgan";
import { env } from "./config/env.js";
import { connectToDatabase } from "./config/db.js";
import { errorHandler } from "./middleware/error.js";
import authRoutes from "./routes/auth.js";
import jobRoutes from "./routes/jobs.js";
import applicationRoutes from "./routes/applications.js";
import crmRoutes from "./routes/crm.js";
import studentRoutes from "./routes/student.js";
import employerRoutes from "./routes/employer.js";

async function bootstrap() {
  try {
    console.log("Connecting to MongoDB...");
    await connectToDatabase(env.mongoUri);
    console.log("✅ Connected to MongoDB successfully!");

    const app = express();
    app.use(cors({ origin: env.corsOrigin || true }));
    app.use(express.json({ limit: "10mb" }));
    app.use(morgan("dev"));

    app.get("/health", (_req, res) => res.json({ ok: true }));

    app.use("/api/auth", authRoutes);
    app.use("/api/jobs", jobRoutes);
    app.use("/api/applications", applicationRoutes);
    app.use("/api/crm", crmRoutes);
    app.use("/api/student", studentRoutes);
    app.use("/api/employer", employerRoutes);

    app.use(errorHandler);

    app.listen(env.port, () => {
      console.log(`🚀 API listening on http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

bootstrap();
