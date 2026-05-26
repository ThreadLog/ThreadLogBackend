import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import {
  getAnnouncements,
  createAnnouncement,
  getLogs,
  createLog,
  getProjects,
  createProject,
  getTasks,
  createTask,
} from "../controllers/workspace.controller.js";
import {
  createAnnouncementValidation,
  createLogValidation,
  createProjectValidation,
  createTaskValidation,
} from "../models/workspace.model.js";

const router = Router();

router.use(protect);

router.get("/announcements", getAnnouncements);
router.post("/announcements", validate(createAnnouncementValidation), createAnnouncement);

router.get("/logs", getLogs);
router.post("/logs", validate(createLogValidation), createLog);

router.get("/projects", getProjects);
router.post("/projects", validate(createProjectValidation), createProject);

router.get("/tasks", getTasks);
router.post("/tasks", validate(createTaskValidation), createTask);

export default router;
