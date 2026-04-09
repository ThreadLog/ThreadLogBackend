import express, { type Request, type Response } from "express";
import jobSeekerRoutes from "./routes/jobseeker.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";
import jobRoutes from "./routes/job.routes.js";
import companyRecruiterRoutes from "./routes/companyrecruiter.routes.js";
import messageRoutes from "./routes/message.routes.js";
import applicationRoutes from "./routes/application.routes.js";
import supportRoutes from "./routes/support.routes.js";
import savedRoutes from "./routes/saved.routes.js";

export const createApp = () => {
  const app = express();

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

  app.use(errorHandler);

  app.get("/health", async (req: Request, res: Response) => {
    res.status(200).json({
      status: "ok✅",
      timestamp: new Date().toISOString(),
    });
  });
  return app;
};
