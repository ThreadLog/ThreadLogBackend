import dotenv from "dotenv";
import { createApp } from "./app.js";
import { prisma } from "./config/db.js";
import { startCronJobs } from "./utils/cronJobs.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await prisma.$connect();
    console.info("DB CONNECTED");
  } catch (error) {
    console.warn("DB NOT CONNECTED on startup — server will still start", error);
  }

  const app = createApp();

  try {
    startCronJobs();
  } catch {
    console.warn("Cron jobs failed to start");
  }

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();
