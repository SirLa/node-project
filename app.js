import express from "express";
import * as routes from './routes';
import bodyParser from "body-parser";
//import authMiddleware from './middlewares/auth';
import passport from "passport";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(parsedCookies);
//app.use(passport.initialize());
require('./config/passport/localStrategy');
//require('./config/passport/facebookStrategy');
//require('./config/passport/twitterStrategy');
//require('./config/passport/googleOAuthStrategy');
app.use('/api/auth', routes.auth);
app.use('/api/products', routes.product);
app.use('/api/users', routes.user);

export default app;