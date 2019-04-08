import passport from "passport";
import FacebookStrategy from "passport-facebook";

const facebookOptions = {
    clientID: 'FACEBOOK_ID',
    clientSecret: 'FACEBOOK_SECRET',
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
};
const strategy = new FacebookStrategy(
    facebookOptions,
    function(accessToken, refreshToken, profile, done) {
        return done(null, true);
    }
);

passport.use('facebook', strategy);