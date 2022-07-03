import dotenv from 'dotenv';
import express from 'express';
import chalk from 'chalk';
import {Logger} from '@utils/logger.util';
import {generateWorldEndpoint} from './endpoints/generate-world.endpoint';
const app = express();

dotenv.config({
    path: './config/.env',
});
app.use(express.json())

app.post(...generateWorldEndpoint);

app.listen(process.env.PORT, () => {
    Logger.goodInfo(chalk.bold('World Processor'), 'is listening on address', chalk.bold(`http://localhost:${process.env.PORT}/`))
});