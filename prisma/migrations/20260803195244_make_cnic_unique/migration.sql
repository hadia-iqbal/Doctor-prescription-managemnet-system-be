/*
  Warnings:

  - A unique constraint covering the columns `[cnic]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `prescription` ADD COLUMN `patientType` VARCHAR(191) NOT NULL DEFAULT 'new';

-- CreateIndex
CREATE UNIQUE INDEX `Patient_cnic_key` ON `Patient`(`cnic`);
