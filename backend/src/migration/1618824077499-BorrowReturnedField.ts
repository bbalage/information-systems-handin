import {MigrationInterface, QueryRunner} from "typeorm";

export class BorrowReturnedField1618824077499 implements MigrationInterface {
    name = 'BorrowReturnedField1618824077499'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `borrowable` (`serialNumber` int NOT NULL AUTO_INCREMENT, `title` varchar(100) NOT NULL, `author` varchar(100) NOT NULL, `maxBorrowTime` int NOT NULL, `type` char(1) NOT NULL, `acquirementDate` date NOT NULL, `status` char(1) NOT NULL, PRIMARY KEY (`serialNumber`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `member` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(100) NOT NULL, `phoneNumber` varchar(20) NOT NULL, `idCardNumber` char(8) NOT NULL, `address` varchar(100) NOT NULL, `status` char(1) NOT NULL, UNIQUE INDEX `IDX_bbfb8a3f99fd1f4826943b7dca` (`idCardNumber`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `borrow` (`borrowId` int NOT NULL AUTO_INCREMENT, `dateOfBorrow` date NOT NULL, `returned` tinyint NOT NULL, `memberId` int NULL, `borrowableSerialNumber` int NULL, PRIMARY KEY (`borrowId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `borrow` ADD CONSTRAINT `FK_c1c20055797527a629d7ca80357` FOREIGN KEY (`memberId`) REFERENCES `member`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `borrow` ADD CONSTRAINT `FK_597621e5cbb313e82d3119ad823` FOREIGN KEY (`borrowableSerialNumber`) REFERENCES `borrowable`(`serialNumber`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `borrow` DROP FOREIGN KEY `FK_597621e5cbb313e82d3119ad823`");
        await queryRunner.query("ALTER TABLE `borrow` DROP FOREIGN KEY `FK_c1c20055797527a629d7ca80357`");
        await queryRunner.query("DROP TABLE `borrow`");
        await queryRunner.query("DROP INDEX `IDX_bbfb8a3f99fd1f4826943b7dca` ON `member`");
        await queryRunner.query("DROP TABLE `member`");
        await queryRunner.query("DROP TABLE `borrowable`");
    }

}
