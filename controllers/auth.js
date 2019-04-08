import jwt from "jsonwebtoken";
import config from "../config/config";
import {doesUserExist} from "../utils/helpers"

exports.login = function (req, res) {
    const {user} = req;
    console.log(user, "++++++++++++++++");
    if (user) {
        const token = jwt.sign(user, config.jwtSecret);
        console.log(token);
        res.json({
            code: 200,
            message: 'OK',
            data: {
                user,
            },
            token
        });
    } else {
        res.json({
            code: 404,
            message: 'Not Found'
        });
    }
};

exports.facebookCallback = function (req, res) {
    res.json({
        code: 200,
        message: 'OK'
    });
};

exports.twitterCallback = function (req, res) {
    res.json({
        code: 200,
        message: 'OK'
    });
};
