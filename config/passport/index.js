import index from '../';
import passportJWT from "passport-jwt";

const ExtractJWT = passportJWT.ExtractJwt;

export const options = {
    jwtOptions: {
        secretOrKey: index.jwtSecret,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    }
};