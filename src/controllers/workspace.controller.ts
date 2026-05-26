import type { NextFunction, Request, Response } from "express";
import {
  getAnnouncementsService,
  createAnnouncementService,
  getLogsService,
  createLogService,
  getProjectsService,
  createProjectService,
  getTasksService,
  createTaskService,
} from "../services/workspace.service.js";
import { AppError } from "../utils/app.error.js";
import type {
  CreateAnnouncementTypeZ,
  CreateLogTypeZ,
  CreateProjectTypeZ,
  CreateTaskTypeZ,
} from "../models/workspace.model.js";

function getCompanyId(req: Request): number {
  if (!req.user?.companyId) {
    throw new AppError("You must belong to a company to use workspace features", 403);
  }
  return req.user.companyId;
}

export const getAnnouncements = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const items = await getAnnouncementsService(getCompanyId(req));
    res.json({ announcements: items });
  } catch (e) { next(e); }
};

export const createAnnouncement = async (req: Request<{}, {}, CreateAnnouncementTypeZ>, res: Response, next: NextFunction) => {
  try {
    const item = await createAnnouncementService(getCompanyId(req), req.body);
    res.status(201).json({ announcement: item });
  } catch (e) { next(e); }
};

export const getLogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const items = await getLogsService(getCompanyId(req));
    res.json({ logs: items });
  } catch (e) { next(e); }
};

export const createLog = async (req: Request<{}, {}, CreateLogTypeZ>, res: Response, next: NextFunction) => {
  try {
    const item = await createLogService(getCompanyId(req), req.body);
    res.status(201).json({ log: item });
  } catch (e) { next(e); }
};

export const getProjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const items = await getProjectsService(getCompanyId(req));
    res.json({ projects: items });
  } catch (e) { next(e); }
};

export const createProject = async (req: Request<{}, {}, CreateProjectTypeZ>, res: Response, next: NextFunction) => {
  try {
    const item = await createProjectService(getCompanyId(req), req.body);
    res.status(201).json({ project: item });
  } catch (e) { next(e); }
};

export const getTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const items = await getTasksService(getCompanyId(req));
    res.json({ tasks: items });
  } catch (e) { next(e); }
};

export const createTask = async (req: Request<{}, {}, CreateTaskTypeZ>, res: Response, next: NextFunction) => {
  try {
    const item = await createTaskService(getCompanyId(req), req.body);
    res.status(201).json({ task: item });
  } catch (e) { next(e); }
};
