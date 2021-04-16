import "reflect-metadata";
import {createConnection} from "typeorm";
import express from 'express';
import { getRouter } from "./routes";
import { Member } from "./entity/Member";
import { Borrowable } from "./entity/Borrowable";
import { Borrow } from "./entity/Borrow";
import { BorrowableItem } from "./entity/BorrowableItem";

createConnection().then(async connection => {

    await addTestData(connection);

    const app = express();

    app.use(express.json());
    app.use('/api', getRouter());

    app.listen(3000, () => {
        console.log('Listening on 3000 ...');
    });

}).catch(error => console.log(error));

async function addTestData(connection) {
    console.log("Inserting test data into database.");

    const member1 = new Member();
    member1.name = "John Doe";
    member1.phoneNumber = "+36 30 404 5671";
    member1.id_card_number = "567473EE";
    member1.address = "3600, Ózd, Lakatos Ábrahám utca, 19.";
    member1.status = 'a';

    const member2 = new Member();
    member2.name = "Jane Doe";
    member2.phoneNumber = "+36 20 998 7352";
    member2.id_card_number = "012ME123";
    member2.address = "3555, Miskolc, Oláh Leonídasz utca 647.";
    member2.status = 'i';

    const borrowable1 = new Borrowable();
    borrowable1.title = "Big Book of little matters";
    borrowable1.author = "Steven Sea Gull";
    borrowable1.max_borror_time = 30;
    borrowable1.type = 'b';

    const borrowable2 = new Borrowable();
    borrowable2.title = "Very evil villain fights very heroic hero";
    borrowable2.author = "Stan Lee";
    borrowable2.max_borror_time = 25;
    borrowable2.type = 'b';

    const borrowableItem1 = new BorrowableItem();
    borrowableItem1.status = 'f';
    borrowableItem1.acquirement_date = new Date(1998, 10, 7);
    borrowableItem1.borrowable = borrowable1;

    const borrowableItem2 = new BorrowableItem();
    borrowableItem2.status = 'f';
    borrowableItem2.acquirement_date = new Date(2000, 1, 1);
    borrowableItem2.borrowable = borrowable2;

    const borrowableItem3 = new BorrowableItem();
    borrowableItem3.status = 'f';
    borrowableItem3.acquirement_date = new Date(2000, 1, 1);
    borrowableItem2.borrowable = borrowable2;

    const borrow1 = new Borrow();
    borrow1.borrowableItem = borrowableItem1;
    borrow1.member = member1;
    borrow1.date_of_borrow = new Date(2019, 10, 10);

    const borrow2 = new Borrow();
    borrow2.borrowableItem = borrowableItem1;
    borrow2.member = member2;
    borrow2.date_of_borrow = new Date(2020, 1, 23);

    const borrow3 = new Borrow();
    borrow3.borrowableItem = borrowableItem2;
    borrow3.member = member1;
    borrow3.date_of_borrow = new Date(2019, 1, 23);

    //borrowable1.borrows = [borrow1, borrow2];
    //borrowable2.borrows = [borrow3];
    //member1.borrows = [borrow1, borrow3];
    //member2.borrows = [borrow2];

    await connection.manager.save(borrowable1);
    await connection.manager.save(borrowable2);
    await connection.manager.save(borrowableItem1);
    await connection.manager.save(borrowableItem2);
    await connection.manager.save(borrowableItem3);
    await connection.manager.save(member1);
    await connection.manager.save(member2);
    await connection.manager.save(borrow1);
    await connection.manager.save(borrow2);
    await connection.manager.save(borrow3);

    console.log("Test data inserted");
}