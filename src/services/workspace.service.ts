import { prisma } from "../config/db.js";
import { AppError } from "../utils/app.error.js";
import type {
  CreateAnnouncementTypeZ,
  CreateLogTypeZ,
  CreateProjectTypeZ,
  CreateTaskTypeZ,
} from "../models/workspace.model.js";

function requireCompany(companyId: number | null | undefined): asserts companyId is number {
  if (!companyId) throw new AppError("You must belong to a company to use workspace features", 403);
}

export const getAnnouncementsService = async (companyId: number) => {
  return prisma.announcement.findMany({
    where: { companyId },
    orderBy: { createdAt: "desc" },
  });
};

export const createAnnouncementService = async (companyId: number, data: CreateAnnouncementTypeZ) => {
  return prisma.announcement.create({
    data: { ...data, companyId },
  });
};

export const getLogsService = async (companyId: number) => {
  return prisma.workspaceLog.findMany({
    where: { companyId },
    orderBy: { createdAt: "desc" },
  });
};

export const createLogService = async (companyId: number, data: CreateLogTypeZ) => {
  return prisma.workspaceLog.create({
    data: { ...data, companyId },
  });
};

export const getProjectsService = async (companyId: number) => {
  return prisma.workspaceProject.findMany({
    where: { companyId },
    orderBy: { createdAt: "desc" },
  });
};

export const createProjectService = async (companyId: number, data: CreateProjectTypeZ) => {
  return prisma.workspaceProject.create({
    data: { ...data, companyId },
  });
};

export const getTasksService = async (companyId: number) => {
  return prisma.workspaceTask.findMany({
    where: { companyId },
    orderBy: { createdAt: "desc" },
  });
};

export const createTaskService = async (companyId: number, data: CreateTaskTypeZ) => {
  return prisma.workspaceTask.create({
    data: { ...data, companyId },
  });
};
