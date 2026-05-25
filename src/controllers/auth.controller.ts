import type { NextFunction, Request, Response } from "express";
import { RegisterJobSeekerTypeZ } from "../models/jobseeker.model.js";
import {
  registerJobSeekerService,
  logInJobSeekerService,
  registerAdminService,
  logInAdminService,
  logInAdminByCodeService,
  getAdminAccessCodeService,
} from "../services/auth.service.js";
import { RegisterCompanyRecruiterTypeZ } from "../models/companyrecruiter.model.js";
import {
  registerCompanyRecruiterService,
  logInCompanyRecruiterService,
} from "../services/auth.service.js";
import { AppError } from "../utils/app.error.js";

export const RegisterJobSeeker = async (
  req: Request<{}, {}, RegisterJobSeekerTypeZ>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;
    const newJobSeeker = await registerJobSeekerService(data);

    if (!newJobSeeker) {
      return res.status(500).json({ status: "Failed to create job seeker" });
    }

    res.status(201).json({
      status: "Job seeker created successfully",
      jobseeker: newJobSeeker,
    });
  } catch (error) {
    next(error);
  }
};

export const LogInJobSeeker = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;
    const jobSeeker = await logInJobSeekerService(data);

    if (!jobSeeker) {
      return res.status(401).json({ status: "Invalid email or password" });
    }

    res.status(200).json({
      status: "Job seeker logged in successfully",
      jobseeker: jobSeeker,
    });
  } catch (error) {
    next(error);
  }
};

export const RegisterCompanyRecruiter = async (
  req: Request<{}, {}, RegisterCompanyRecruiterTypeZ>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;
    const newCompanyRecruiter = await registerCompanyRecruiterService(data);

    if (!newCompanyRecruiter) {
      return res
        .status(500)
        .json({ status: "Failed to create company recruiter" });
    }

    res.status(201).json({
      status: "Company recruiter created successfully",
      companyRecruiter: newCompanyRecruiter,
    });
  } catch (error) {
    next(error);
  }
};

export const LogInCompanyRecruiter = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;
    const companyRecruiter = await logInCompanyRecruiterService(data);

    if (!companyRecruiter) {
      return res.status(401).json({ status: "Invalid email or password" });
    }

    res.status(200).json({
      status: "Company recruiter logged in successfully",
      companyRecruiter: companyRecruiter,
    });
  } catch (error) {
    next(error);
  }
};

export const RegisterAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;
    const newAdmin = await registerAdminService(data);

    if (!newAdmin) {
      return res.status(500).json({ status: "Failed to create admin" });
    }

    res.status(201).json({
      status: "Admin created successfully",
      admin: newAdmin,
    });
  } catch (error) {
    next(error);
  }
};

export const LogInAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;
    const admin = await logInAdminService(data);

    if (!admin) {
      return res.status(401).json({ status: "Invalid email or password" });
    }

    res.status(200).json({
      status: "Admin logged in successfully",
      admin,
    });
  } catch (error) {
    next(error);
  }
};

export const LogInAdminByCode = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;
    const admin = await logInAdminByCodeService(data);

    if (!admin) {
      return res.status(401).json({ status: "Invalid email or access code" });
    }

    res.status(200).json({
      status: "Admin code accepted successfully",
      admin,
    });
  } catch (error) {
    next(error);
  }
};

export const DownloadAdminAccessCode = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const adminId = req.user?.id;

    if (!adminId) {
      throw new AppError("Unauthorized", 401);
    }

    const admin = await getAdminAccessCodeService(adminId);
    const fileContents = [
      "Admin Access Code",
      `Company: ${admin.companyName}`,
      `Email: ${admin.email}`,
      `Code: ${admin.adminAccessCode}`,
    ].join("\n");

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="admin-access-code-${admin.id}.txt"`,
    );
    res.status(200).send(fileContents);
  } catch (error) {
    next(error);
  }
};
