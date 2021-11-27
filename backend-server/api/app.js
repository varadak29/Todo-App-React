import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';
import models from './models/index.js';
import cors from 'cors';

const app = express();

mongoose.connect('mongodb://localhost:27017/contactsdb');

app.use(express.json());
app.use(express.urlencoded({ extended : false}));
app.use(cookieParser());

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT,PATCH, DELETE');
	res.setHeader("Access-Control-Allow-Headers", "Content-Type,Accept, Access-Control-Allow-Headers, Authorization, X-Requested-With");
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	res.setHeader("Content-Type", "application/json");
	next();
});

routes(app);

export default app;