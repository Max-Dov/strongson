import dotenv from 'dotenv';
import express from 'express';
import chalk from 'chalk';
import {Logger} from '@utils/logger.util';
const app = express();

dotenv.config({
    path: './config/.env',
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(process.env.PORT, () => {
    Logger.goodInfo(chalk.bold('World Processor'), 'is listening on address', chalk.bold(`http://localhost:${process.env.PORT}/`))
});