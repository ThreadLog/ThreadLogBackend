-- DropForeignKey
ALTER TABLE "JobSeeker" DROP CONSTRAINT "JobSeeker_companyId_fkey";

-- AddForeignKey
ALTER TABLE "JobSeeker" ADD CONSTRAINT "JobSeeker_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "CompanyRecruiter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
