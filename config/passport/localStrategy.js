import passport from "passport";
import LocalStrategy from "passport-local";

const USER = {
    id: 0,
    userName: "test",
    email: 'test@mail.com',
    password: "test1"
};
const strategy = new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    function (email, password, done) {
        if (!checkAuth(email, password)) {
            return done(null, {});
        }

        delete USER.password;
        return done(null, USER);
    }
);

passport.use('local', strategy);

function checkAuth(email, password) {
    return email === USER.email && password === USER.password;
}