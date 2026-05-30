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

function isOriginAllowed(origin: string): boolean {
  if (/^http:\/\/localhost:\d+$/.test(origin)) {
    return true;
  }
  if (/^https:\/\/[a-zA-Z0-9-]+\.vercel\.app$/.test(origin)) {
    return true;
  }
  if (process.env.CORS_ORIGIN) {
    const extras = process.env.CORS_ORIGIN.split(",").map((s) => s.trim());
    if (extras.includes(origin)) return true;
  }
  return false;
}

export const createApp = () => {
  const app = express();

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || isOriginAllowed(origin)) {
          callback(null, true);
        } else {
          callback(null, false);
        }
      },
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      preflightContinue: false,
      optionsSuccessStatus: 200,
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

  app.get("/", async (req: Request, res: Response) => {
    res.status(200).json({
      status: "running",
      timestamp: new Date().toISOString(),
    });
  });

  return app;
};
