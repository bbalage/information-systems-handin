import { Borrow } from "../entity/Borrow";
import { Borrowable } from "../entity/Borrowable";
import { BorrowableItem } from "../entity/BorrowableItem";
import { Member } from "../entity/Member";

export async function addTestData(connection) {
    console.log("Inserting test data into database.");

    const member1 = new Member();
    member1.name = "John Doe";
    member1.phoneNumber = "+36 30 404 5671";
    member1.idCardNumber = "567473EE";
    member1.address = "3600, Ózd, Lakatos Ábrahám utca, 19.";
    member1.status = 'a';

    const member2 = new Member();
    member2.name = "Jane Doe";
    member2.phoneNumber = "+36 20 998 7352";
    member2.idCardNumber = "012ME123";
    member2.address = "3555, Miskolc, Oláh Leonídasz utca 647.";
    member2.status = 'i';

    const borrowable1 = new Borrowable();
    borrowable1.title = "Big Book of little matters";
    borrowable1.author = "Steven Sea Gull";
    borrowable1.maxBorrowTime = 30;
    borrowable1.type = 'b';

    const borrowable2 = new Borrowable();
    borrowable2.title = "Very evil villain fights very heroic hero";
    borrowable2.author = "Stan Lee";
    borrowable2.maxBorrowTime = 25;
    borrowable2.type = 'b';

    const borrowableItem1 = new BorrowableItem();
    borrowableItem1.status = 'f';
    borrowableItem1.acquirementDate = new Date(1998, 10, 7);
    borrowableItem1.borrowable = borrowable1;

    const borrowableItem2 = new BorrowableItem();
    borrowableItem2.status = 'f';
    borrowableItem2.acquirementDate = new Date(2000, 1, 1);
    borrowableItem2.borrowable = borrowable2;

    const borrowableItem3 = new BorrowableItem();
    borrowableItem3.status = 'f';
    borrowableItem3.acquirementDate = new Date(2000, 1, 1);
    borrowableItem2.borrowable = borrowable2;

    const borrow1 = new Borrow();
    borrow1.borrowableItem = borrowableItem1;
    borrow1.member = member1;
    borrow1.dateOfBorrow = new Date(2019, 10, 10);

    const borrow2 = new Borrow();
    borrow2.borrowableItem = borrowableItem1;
    borrow2.member = member2;
    borrow2.dateOfBorrow = new Date(2020, 1, 23);

    const borrow3 = new Borrow();
    borrow3.borrowableItem = borrowableItem2;
    borrow3.member = member1;
    borrow3.dateOfBorrow = new Date(2019, 1, 23);

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