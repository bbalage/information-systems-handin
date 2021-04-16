import {MigrationInterface, QueryRunner} from "typeorm";

export class basicRelationalStructure1618573308092 implements MigrationInterface {
    name = 'basicRelationalStructure1618573308092'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `borrowable` (`serial_number` int NOT NULL AUTO_INCREMENT, `title` varchar(100) NOT NULL, `author` varchar(100) NOT NULL, `acquirement_date` date NOT NULL, `max_borror_time` int NOT NULL, `type` char(1) NOT NULL, `status` char(1) NOT NULL, PRIMARY KEY (`serial_number`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `member` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(100) NOT NULL, `phoneNumber` varchar(20) NOT NULL, `id_card_number` char(8) NOT NULL, `address` varchar(100) NOT NULL, `status` char(1) NOT NULL, UNIQUE INDEX `IDX_7e611f62b1d8a2623c9eb50b83` (`id_card_number`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `borrow` (`borrow_id` int NOT NULL AUTO_INCREMENT, `date_of_borrow` date NOT NULL, `memberId` int NULL, `borrowableSerialNumber` int NULL, PRIMARY KEY (`borrow_id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `borrow` ADD CONSTRAINT `FK_c1c20055797527a629d7ca80357` FOREIGN KEY (`memberId`) REFERENCES `member`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `borrow` ADD CONSTRAINT `FK_597621e5cbb313e82d3119ad823` FOREIGN KEY (`borrowableSerialNumber`) REFERENCES `borrowable`(`serial_number`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `borrow` DROP FOREIGN KEY `FK_597621e5cbb313e82d3119ad823`");
        await queryRunner.query("ALTER TABLE `borrow` DROP FOREIGN KEY `FK_c1c20055797527a629d7ca80357`");
        await queryRunner.query("DROP TABLE `borrow`");
        await queryRunner.query("DROP INDEX `IDX_7e611f62b1d8a2623c9eb50b83` ON `member`");
        await queryRunner.query("DROP TABLE `member`");
        await queryRunner.query("DROP TABLE `borrowable`");
    }

}
