/*
  Warnings:

  - You are about to drop the column `formulaNames` on the `prescription` table. All the data in the column will be lost.
  - You are about to drop the column `patientPhone` on the `prescription` table. All the data in the column will be lost.
  - You are about to drop the column `prescriptionId` on the `prescription` table. All the data in the column will be lost.
  - Added the required column `patientId` to the `Prescription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Prescription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prepInstruction` to the `Prescription` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Prescription_prescriptionId_key` ON `prescription`;

-- AlterTable
ALTER TABLE `prescription` DROP COLUMN `formulaNames`,
    DROP COLUMN `patientPhone`,
    DROP COLUMN `prescriptionId`,
    ADD COLUMN `age` INTEGER NULL,
    ADD COLUMN `cnic` VARCHAR(191) NULL,
    ADD COLUMN `customFormula` VARCHAR(191) NULL,
    ADD COLUMN `formulaName` VARCHAR(191) NULL,
    ADD COLUMN `gender` VARCHAR(191) NULL,
    ADD COLUMN `patientId` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone` VARCHAR(191) NOT NULL,
    ADD COLUMN `prepInstruction` VARCHAR(191) NOT NULL,
    MODIFY `complaint` VARCHAR(191) NULL,
    MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'Pending';
