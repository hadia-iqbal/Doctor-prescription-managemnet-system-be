-- CreateTable
CREATE TABLE `Dispensing` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tenantId` VARCHAR(191) NOT NULL,
    `patientName` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `cnic` VARCHAR(191) NULL,
    `formulaNames` VARCHAR(191) NOT NULL,
    `prepInstruction` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'Pending',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
