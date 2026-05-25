import bcrypt from "bcrypt";
import { prisma } from "../config/db.js";
import { AppError } from "../utils/app.error.js";
import jwt from "jsonwebtoken";
import crypto from "node:crypto";
const generateAdminAccessCode = () => crypto.randomBytes(4).toString("hex").toUpperCase();
export const registerJobSeekerService = async (data) => {
    const existingJobSeeker = await prisma.jobSeeker.findUnique({
        where: { email: data.email },
    });
    if (existingJobSeeker) {
        throw new AppError("Job seeker with that email already exists", 409);
    }
    // encrypt the password
    const hashedPassword = await bcrypt.hash(data.password, 12);
    const createdJobSeeker = await prisma.jobSeeker.create({
        data: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: hashedPassword,
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
        },
    });
    return createdJobSeeker;
};
export const logInJobSeekerService = async (data) => {
    const jobSeeker = await prisma.jobSeeker.findUnique({
        where: { email: data.email },
    });
    if (!jobSeeker) {
        throw new AppError("Invalid email or password", 401);
    }
    const isPasswordValid = await bcrypt.compare(data.password, jobSeeker.password);
    if (!isPasswordValid) {
        throw new AppError("Invalid email or password", 401);
    }
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new AppError("JWT_SECRET not set", 500);
    }
    const expiresIn = (process.env.JWT_EXPIRES_IN ??
        "1d");
    const token = jwt.sign({
        id: jobSeeker.id,
        email: jobSeeker.email,
        role: jobSeeker.role,
    }, jwtSecret, {
        expiresIn,
    });
    const { password, ...jobSeekerExcludingPassword } = jobSeeker;
    return { ...jobSeekerExcludingPassword, token };
};
export const registerCompanyRecruiterService = async (data) => {
    const existingCompanyRecruiter = await prisma.companyRecruiter.findUnique({
        where: { email: data.email },
    });
    if (existingCompanyRecruiter) {
        throw new AppError("Company recruiter with that email already exists", 409);
    }
    // encrypt the password
    const hashedPassword = await bcrypt.hash(data.password, 12);
    return prisma.companyRecruiter.create({
        data: {
            email: data.email,
            companyName: data.companyName,
            password: hashedPassword,
            organizationNumber: data.organizationNumber,
            phoneNumber: data.phoneNumber,
        },
        select: {
            id: true,
            email: true,
            companyName: true,
            organizationNumber: true,
            phoneNumber: true,
        },
    });
};
export const logInCompanyRecruiterService = async (data) => {
    // compare the passed in email with the one in the database
    const companyRecruiter = await prisma.companyRecruiter.findUnique({
        where: { email: data.email },
    });
    if (!companyRecruiter) {
        throw new AppError("Invalid email or password", 401);
    }
    // compare the passed in password with the one in the database
    const isPasswordValid = await bcrypt.compare(data.password, companyRecruiter.password);
    if (!isPasswordValid) {
        throw new AppError("Invalid email or password", 401);
    }
    // add jwt token generation here
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new AppError("JWT_SECRET not set", 500);
    }
    const expiresIn = (process.env.JWT_EXPIRES_IN ??
        "1d");
    const token = jwt.sign({
        id: companyRecruiter.id,
        email: companyRecruiter.email,
        role: companyRecruiter.role,
    }, jwtSecret, {
        expiresIn,
    });
    const { password, ...companyRecruiterExcludingPassword } = companyRecruiter; // this is to exclude the password from the returned object
    return { ...companyRecruiterExcludingPassword, token };
};
export const registerAdminService = async (data) => {
    const adminAccessCode = data.adminAccessCode ?? generateAdminAccessCode();
    const existingAdmin = await prisma.companyRecruiter.findUnique({
        where: { email: data.companyEmail },
    });
    if (existingAdmin) {
        throw new AppError("Admin with that email already exists", 409);
    }
    const hashedPassword = await bcrypt.hash(data.password, 12);
    return prisma.companyRecruiter.create({
        data: {
            email: data.companyEmail,
            companyName: data.companyName,
            password: hashedPassword,
            organizationNumber: data.organizationNumber,
            phoneNumber: data.companyPhone,
            description: data.description,
            role: "ADMIN",
            adminAccessCode,
        },
        select: {
            id: true,
            email: true,
            companyName: true,
            organizationNumber: true,
            phoneNumber: true,
            role: true,
            adminAccessCode: true,
        },
    });
};
export const logInAdminService = async (data) => {
    const admin = await prisma.companyRecruiter.findUnique({
        where: { email: data.email },
    });
    if (!admin || admin.role !== "ADMIN") {
        throw new AppError("Invalid email or password", 401);
    }
    const isPasswordValid = await bcrypt.compare(data.password, admin.password);
    if (!isPasswordValid) {
        throw new AppError("Invalid email or password", 401);
    }
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new AppError("JWT_SECRET not set", 500);
    }
    const expiresIn = (process.env.JWT_EXPIRES_IN ??
        "1d");
    const token = jwt.sign({
        id: admin.id,
        email: admin.email,
        role: admin.role,
    }, jwtSecret, {
        expiresIn,
    });
    const { password, ...adminExcludingPassword } = admin;
    return { ...adminExcludingPassword, token };
};
export const logInAdminByCodeService = async (data) => {
    const admin = await prisma.companyRecruiter.findUnique({
        where: { email: data.email },
    });
    if (!admin || admin.role !== "ADMIN") {
        throw new AppError("Invalid email or access code", 401);
    }
    if (!admin.adminAccessCode ||
        admin.adminAccessCode !== data.adminAccessCode) {
        throw new AppError("Invalid email or access code", 401);
    }
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new AppError("JWT_SECRET not set", 500);
    }
    const expiresIn = (process.env.JWT_EXPIRES_IN ??
        "1d");
    const token = jwt.sign({
        id: admin.id,
        email: admin.email,
        role: admin.role,
    }, jwtSecret, {
        expiresIn,
    });
    const { password, ...adminExcludingPassword } = admin;
    return { ...adminExcludingPassword, token };
};
export const getAdminAccessCodeService = async (adminId) => {
    const admin = await prisma.companyRecruiter.findUnique({
        where: { id: adminId },
        select: {
            id: true,
            email: true,
            companyName: true,
            role: true,
            adminAccessCode: true,
        },
    });
    if (!admin || admin.role !== "ADMIN") {
        throw new AppError("Admin not found", 404);
    }
    if (!admin.adminAccessCode) {
        throw new AppError("Admin access code not set", 404);
    }
    return admin;
};
