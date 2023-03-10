import cors from 'cors';
import https from 'node:https';
import fs from 'node:fs';
import morgan from 'morgan';
import express from 'express';

import { albumsRouter } from './routes/albums.router';
import { employeesRouter } from './routes/employees.router';
import { studentsRouter } from './routes/students.router';
import { ok } from 'assert';

const PORT = process.env.PORT;
const HOSTNAME = process.env.HOSTNAME;

ok(PORT, 'The PORT environment variable is missing.');
ok(parseInt(PORT), 'The PORT environment variable is not a number.');
ok(HOSTNAME, 'The HOSTNAME environment variable is missing.');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/albums', albumsRouter);
app.use('/employees', employeesRouter);
app.use('/students', studentsRouter);

const server = app.listen(parseInt(PORT), HOSTNAME, () => {
	console.log('Listening on port 3000');
});
