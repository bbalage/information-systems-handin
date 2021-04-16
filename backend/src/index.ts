import "reflect-metadata";
import {createConnection} from "typeorm";
import express from 'express';
import { getRouter } from "./routes";
import { addTestData } from "./util/testData";

createConnection().then(async connection => {

    await addTestData(connection);

    const app = express();

    app.use(express.json());
    app.use('/api', getRouter());

    app.listen(3000, () => {
        console.log('Listening on 3000 ...');
    });

}).catch(error => console.log(error));