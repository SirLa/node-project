import jwt from "jsonwebtoken";
import config from '../config/config';

export default function (req, res, next) {
    const token = req.headers['authorization'].split(' ')[1];
    jwt.verify(token, config.password, err => {
        if (err) {
            res.sendStatus(403);
        } else {
            next();
        }
    });
}