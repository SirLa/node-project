import express from "express";
import * as routes from './routes';
import bodyParser from "body-parser";
import parsedCookies from './middlewares/parsedCookies';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(parsedCookies);
app.use('/api/products', routes.product);
app.use('/api/users', routes.user);

export default app;