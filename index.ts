import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

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
    app.use(express.raw({ limit: '100MB' }));
    
    app.get('/', (req: Request, res: Response) => {
        const protocol = req.protocol;
        const host = req.get('host');
        const baseUrl = `${protocol}://${host}`;
        
        const indexPath = path.join(__dirname, '../public/index.html');
        let html = fs.readFileSync(indexPath, 'utf8');
        
        html = html.replace(
            'let baseUrl = \'\';',
            `let baseUrl = '${baseUrl}';`
        );
        
        res.send(html);
    });
    
    app.use(express.static('public'));

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
