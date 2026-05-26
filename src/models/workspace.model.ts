import { z } from "zod";

export const createAnnouncementValidation = z.object({
  body: z.object({
    category: z.string().min(1).max(60),
    priority: z.enum(["low", "medium", "high"]),
    description: z.string().min(1).max(500),
  }).strict(),
});

export const createLogValidation = z.object({
  body: z.object({
    content: z.string().min(1).max(1000),
  }).strict(),
});

export const createProjectValidation = z.object({
  body: z.object({
    title: z.string().min(1).max(80),
    description: z.string().min(1).max(500),
    objective: z.string().min(1).max(300),
    keyFeature: z.string().min(1).max(200),
  }).strict(),
});

export const createTaskValidation = z.object({
  body: z.object({
    title: z.string().min(1).max(80),
    objective: z.string().min(1).max(300),
    cause: z.string().min(1).max(500),
  }).strict(),
});

export type CreateAnnouncementTypeZ = z.infer<typeof createAnnouncementValidation>["body"];
export type CreateLogTypeZ = z.infer<typeof createLogValidation>["body"];
export type CreateProjectTypeZ = z.infer<typeof createProjectValidation>["body"];
export type CreateTaskTypeZ = z.infer<typeof createTaskValidation>["body"];
