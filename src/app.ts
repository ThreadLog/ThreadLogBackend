import express, { type Request, type Response } from "express";
import cors from "cors";
import jobSeekerRoutes from "./routes/jobseeker.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";
import jobRoutes from "./routes/job.routes.js";
import companyRecruiterRoutes from "./routes/companyrecruiter.routes.js";
import messageRoutes from "./routes/message.routes.js";
import applicationRoutes from "./routes/application.routes.js";
import supportRoutes from "./routes/support.routes.js";
import savedRoutes from "./routes/saved.routes.js";
import workspaceRoutes from "./routes/workspace.routes.js";

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:4000",
  "https://threadlog-nine.vercel.app",
];
if (process.env.CORS_ORIGIN) {
  allowedOrigins.push(
    ...process.env.CORS_ORIGIN.split(",").map((s) => s.trim()),
  );
}

export const createApp = () => {
  const app = express();

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin) return callback(null, true);

        if (
          origin.endsWith(".vercel.app") ||
          origin === "http://localhost:3000" ||
          origin === "https://threadlogbackend-production.up.railway.app"
        ) {
          return callback(null, true);
        }

        return callback(new Error("Not allowed by CORS"));
      },
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      optionsSuccessStatus: 200,
      preflightContinue: false,
    }),
  );
  app.use(express.json());

  // job seeker routes
  app.use("/api/jobseekers", jobSeekerRoutes);
  app.use("/api/companyrecruiter", companyRecruiterRoutes);

  // message routes
  app.use("/api/messages", messageRoutes);
  app.use("/api/applications", applicationRoutes);

  // job routes
  app.use("/api/jobs", jobRoutes);

  // saved routes
  app.use("/api/saved", savedRoutes);

  // auth routes
  app.use("/api/auth", authRoutes);

  // support routes
  app.use("/api", supportRoutes);

  // workspace routes (company-isolated)
  app.use("/api/workspace", workspaceRoutes);

  app.use(errorHandler);

  app.get("/health", async (req: Request, res: Response) => {
    res.status(200).json({
      status: "ok✅",
      timestamp: new Date().toISOString(),
    });
  });
  return app;
};
