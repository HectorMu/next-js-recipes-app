-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RecipeCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserRecipe` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `isPublic` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserRecipePreparationStep` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `stepOrder` INTEGER NOT NULL DEFAULT 0,
    `userRecipeId` INTEGER NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserRecipeIngredient` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `userRecipeId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `measure` ENUM('mg', 'ml', 'g', 'kg', 'lt', 'package', 'box', 'unit') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserRecipeCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `recipeCategoryId` INTEGER NOT NULL,
    `userRecipeId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserRecipeView` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userRecipeId` INTEGER NOT NULL,
    `quantity` BIGINT NOT NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserRecipeLike` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userRecipeId` INTEGER NOT NULL,
    `quantity` BIGINT NOT NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserRecipeDislike` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userRecipeId` INTEGER NOT NULL,
    `quantity` BIGINT NOT NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserRecipeComment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userRecipeId` INTEGER NOT NULL,
    `quantity` BIGINT NOT NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserRecipeShowCase` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userRecipeId` INTEGER NOT NULL,
    `likesCount` BIGINT NOT NULL,
    `visitCount` BIGINT NOT NULL,
    `viewCount` BIGINT NOT NULL,
    `commentaryCount` BIGINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserRecipe` ADD CONSTRAINT `UserRecipe_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRecipePreparationStep` ADD CONSTRAINT `UserRecipePreparationStep_userRecipeId_fkey` FOREIGN KEY (`userRecipeId`) REFERENCES `UserRecipe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRecipeIngredient` ADD CONSTRAINT `UserRecipeIngredient_userRecipeId_fkey` FOREIGN KEY (`userRecipeId`) REFERENCES `UserRecipe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRecipeCategory` ADD CONSTRAINT `UserRecipeCategory_recipeCategoryId_fkey` FOREIGN KEY (`recipeCategoryId`) REFERENCES `RecipeCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRecipeCategory` ADD CONSTRAINT `UserRecipeCategory_userRecipeId_fkey` FOREIGN KEY (`userRecipeId`) REFERENCES `UserRecipe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRecipeView` ADD CONSTRAINT `UserRecipeView_userRecipeId_fkey` FOREIGN KEY (`userRecipeId`) REFERENCES `UserRecipe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRecipeView` ADD CONSTRAINT `UserRecipeView_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRecipeLike` ADD CONSTRAINT `UserRecipeLike_userRecipeId_fkey` FOREIGN KEY (`userRecipeId`) REFERENCES `UserRecipe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRecipeLike` ADD CONSTRAINT `UserRecipeLike_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRecipeDislike` ADD CONSTRAINT `UserRecipeDislike_userRecipeId_fkey` FOREIGN KEY (`userRecipeId`) REFERENCES `UserRecipe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRecipeDislike` ADD CONSTRAINT `UserRecipeDislike_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRecipeComment` ADD CONSTRAINT `UserRecipeComment_userRecipeId_fkey` FOREIGN KEY (`userRecipeId`) REFERENCES `UserRecipe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRecipeComment` ADD CONSTRAINT `UserRecipeComment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRecipeShowCase` ADD CONSTRAINT `UserRecipeShowCase_userRecipeId_fkey` FOREIGN KEY (`userRecipeId`) REFERENCES `UserRecipe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
