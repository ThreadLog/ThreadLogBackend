import { Router } from "express";

import {
  LogInJobSeeker,
  RegisterJobSeeker,
  RegisterCompanyRecruiter,
  LogInCompanyRecruiter,
  RegisterAdmin,
  LogInAdmin,
  LogInAdminByCode,
  DownloadAdminAccessCode,
} from "../controllers/auth.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import {
  logInJobSeekerValidation,
  registerJobSeekerValidation,
} from "../models/jobseeker.model.js";
import {
  registerJobRecruiterValidation,
  loginJobRecruiterValidation,
  registerAdminValidation,
  loginAdminValidation,
  loginAdminByCodeValidation,
} from "../models/companyrecruiter.model.js";
import { protect, restrictTo } from "../middleware/auth.middleware.js";

const router = Router();

router.post(
  "/registeremployee",
  validate(registerJobSeekerValidation),
  RegisterJobSeeker,
);

router.post(
  "/loginemployee",
  validate(logInJobSeekerValidation),
  LogInJobSeeker,
);

router.post(
  "/registercompanyrecruiter",
  validate(registerJobRecruiterValidation),
  RegisterCompanyRecruiter,
);

router.post(
  "/logincompanyrecruiter",
  validate(loginJobRecruiterValidation),
  LogInCompanyRecruiter,
);

router.post("/registeradmin", validate(registerAdminValidation), RegisterAdmin);

router.post("/loginadmin", validate(loginAdminValidation), LogInAdmin);

router.post(
  "/loginadminbycode",
  validate(loginAdminByCodeValidation),
  LogInAdminByCode,
);

router.get(
  "/admin-access-code",
  protect,
  restrictTo("ADMIN"),
  DownloadAdminAccessCode,
);

export default router;
