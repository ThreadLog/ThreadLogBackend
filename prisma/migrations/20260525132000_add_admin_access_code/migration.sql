-- AlterTable
ALTER TABLE "CompanyRecruiter"
ADD COLUMN     "adminAccessCode" TEXT,
ADD CONSTRAINT "CompanyRecruiter_adminAccessCode_key" UNIQUE ("adminAccessCode");