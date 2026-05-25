import { GetAllCompanyRecruitersService, GetCompanyRecruiterByIdService, UpdateCompanyRecruiterByIdService, DeleteCompanyRecruiterByIdService, } from "../services/companyrecruiter.service.js";
// ! CRUD operations for job recruiter
// ? Get all job recruiters
export const GetCompanyRecruiters = async (req, res, next) => {
    try {
        const search = req.query.search;
        const city = req.query.city;
        const country = req.query.country;
        const industry = req.query.industry;
        const page = req.query.page ? Number(req.query.page) : 1;
        const limit = req.query.limit ? Number(req.query.limit) : 10;
        const companyRecruiters = await GetAllCompanyRecruitersService({
            search,
            city,
            country,
            industry,
        }, { page, limit });
        res.status(200).json({
            status: "success",
            data: companyRecruiters,
        });
    }
    catch (error) {
        next(error);
    }
};
// ? Get a single job recruiter by ID
export const GetCompanyRecruitersById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const idInt = Number(id);
        const companyRecruiter = await GetCompanyRecruiterByIdService(idInt);
        if (!companyRecruiter) {
            return res
                .status(404)
                .json({ status: `Company recruiter with id ${id} not found` });
        }
        res.status(200).json({
            status: "success",
            data: companyRecruiter,
        });
    }
    catch (error) {
        next(error);
    }
};
// ? Update job recruiter  details by ID
export const UpdateCompanyRecruiterById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const idInt = Number(id);
        const updateData = req.body;
        if (req.user?.id !== idInt && req.user?.role !== "ADMIN") {
            return res.status(403).json({
                message: "Forbidden: You can only update your own profile",
            });
        }
        const updatedCompanyRecruiter = await UpdateCompanyRecruiterByIdService(idInt, updateData);
        if (!updatedCompanyRecruiter) {
            return res
                .status(404)
                .json({ status: `Company recruiter with id ${id} not found` });
        }
        res.status(200).json({
            status: "success",
            data: updatedCompanyRecruiter,
        });
    }
    catch (error) {
        next(error);
    }
};
// ? Delete job recruiter account by ID
export const DeleteCompanyRecruiterById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const idInt = Number(id);
        if (req.user?.id !== idInt && req.user?.role !== "ADMIN") {
            return res.status(403).json({
                message: "Forbidden: You can only delete your own profile",
            });
        }
        const deletedCompanyRecruiter = await DeleteCompanyRecruiterByIdService(idInt);
        if (!deletedCompanyRecruiter) {
            return res
                .status(404)
                .json({ message: `Company recruiter with id ${id} not found` });
        }
        res.status(200).json({
            status: "success",
            data: deletedCompanyRecruiter,
        });
    }
    catch (error) {
        next(error);
    }
};
