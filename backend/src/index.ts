import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";
import express from 'express';
import { getRouter } from "./routes";

createConnection().then(async connection => {

    await addTestUser(connection);
    const app = express();

    app.use(express.json());
    app.use('/api', getRouter());

    app.listen(3000, () => {
        console.log('Listening on 3000 ...');
    });

}).catch(error => console.log(error));


async function addTestUser(connection) {
    console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    await connection.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await connection.manager.find(User);
    console.log("Loaded users: ", users);

    console.log("Here you can setup and run express/koa/any other framework.");

}