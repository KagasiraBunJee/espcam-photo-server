import express, { Application } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import fs from 'fs';

import { Api } from './api';

dotenv.config();

const dbLogin = process.env.DBLOGIN;
const dbPass = process.env.DBPASS;
const dbName = process.env.DBNAME;

const dbDomain = process.env.DBDOMAIN;
const dbPort = process.env.DBPORT;
const serverPort = Number(process.env.PORT) || 8000;

const setup = async () => {
    await mongoose.connect('mongodb://'+dbDomain+':'+dbPort, { user: dbLogin, pass: dbPass, dbName });
    const app: Application = express();

    app.use(express.json());
    app.use(express.raw({ limit: '10MB' }));

    let apiEnd = Api();
    apiEnd.register(app);
    
    app.listen(serverPort, () => {
        console.log(`Server is Fire at http://localhost:${serverPort}`);
        
        // create upload dir if not exists
        const uploadDir = "./uploads";
        if (!fs.existsSync(uploadDir)){
            fs.mkdirSync(uploadDir);
        }
    });
};

setup();
