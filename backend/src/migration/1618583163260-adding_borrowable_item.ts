import {MigrationInterface, QueryRunner} from "typeorm";

export class addingBorrowableItem1618583163260 implements MigrationInterface {
    name = 'addingBorrowableItem1618583163260'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `borrowable` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(100) NOT NULL, `author` varchar(100) NOT NULL, `max_borror_time` int NOT NULL, `type` char(1) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `borrowable_item` (`serial_number` int NOT NULL AUTO_INCREMENT, `acquirement_date` date NOT NULL, `status` char(1) NOT NULL, `borrowableId` int NULL, PRIMARY KEY (`serial_number`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `member` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(100) NOT NULL, `phoneNumber` varchar(20) NOT NULL, `id_card_number` char(8) NOT NULL, `address` varchar(100) NOT NULL, `status` char(1) NOT NULL, UNIQUE INDEX `IDX_7e611f62b1d8a2623c9eb50b83` (`id_card_number`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `borrow` (`borrow_id` int NOT NULL AUTO_INCREMENT, `date_of_borrow` date NOT NULL, `memberId` int NULL, `borrowableItemSerialNumber` int NULL, PRIMARY KEY (`borrow_id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `borrowable_item` ADD CONSTRAINT `FK_79aa86913506e819ceb3898ddfc` FOREIGN KEY (`borrowableId`) REFERENCES `borrowable`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `borrow` ADD CONSTRAINT `FK_c1c20055797527a629d7ca80357` FOREIGN KEY (`memberId`) REFERENCES `member`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `borrow` ADD CONSTRAINT `FK_342b59afd651f54763c836d5bb3` FOREIGN KEY (`borrowableItemSerialNumber`) REFERENCES `borrowable_item`(`serial_number`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `borrow` DROP FOREIGN KEY `FK_342b59afd651f54763c836d5bb3`");
        await queryRunner.query("ALTER TABLE `borrow` DROP FOREIGN KEY `FK_c1c20055797527a629d7ca80357`");
        await queryRunner.query("ALTER TABLE `borrowable_item` DROP FOREIGN KEY `FK_79aa86913506e819ceb3898ddfc`");
        await queryRunner.query("DROP TABLE `borrow`");
        await queryRunner.query("DROP INDEX `IDX_7e611f62b1d8a2623c9eb50b83` ON `member`");
        await queryRunner.query("DROP TABLE `member`");
        await queryRunner.query("DROP TABLE `borrowable_item`");
        await queryRunner.query("DROP TABLE `borrowable`");
    }

}
