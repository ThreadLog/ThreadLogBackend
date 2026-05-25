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

    const app = createApp();

    startCronJobs();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("DB NOT CONNECTED", error);
    await prisma.$disconnect().catch(() => undefined);
    process.exit(1);
  }
};

startServer();
