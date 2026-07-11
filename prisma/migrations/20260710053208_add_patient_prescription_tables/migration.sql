-- CreateTable
CREATE TABLE `Patient` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patientId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `cnic` VARCHAR(191) NULL,
    `age` INTEGER NULL,
    `gender` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Patient_patientId_key`(`patientId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Prescription` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `prescriptionId` VARCHAR(191) NOT NULL,
    `patientName` VARCHAR(191) NOT NULL,
    `patientPhone` VARCHAR(191) NOT NULL,
    `doctorName` VARCHAR(191) NOT NULL,
    `complaint` VARCHAR(191) NOT NULL,
    `formulaNames` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'pending',
    `nextVisit` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Prescription_prescriptionId_key`(`prescriptionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
