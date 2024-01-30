import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import { applicationDefault, initializeApp } from 'firebase-admin/app';

import routes from './src/routes/v1'
import * as config from './config'

dotenv.config()

const app = express()
const port = config.server.port || 5002
const clientPort = config.client.port || 3000

initializeApp({
   credential: applicationDefault(),
});

var corsOptions = {
   origin: ['https://app.roadmapo.com', 'http://localhost:' + clientPort]
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// set port, listen for requests
app.listen(port, () => {
   console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
});

app.use('/v1', routes)
