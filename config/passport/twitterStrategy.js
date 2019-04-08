import passport from "passport";
import TwitterStrategy from "passport-twitter";

const twitterOptions = {
    clientID: 'Twitter_ID',
    clientSecret: 'Twitter_SECRET',
    callbackURL: 'http://localhost:3000/auth/twitter/callback'
};
const strategy = new TwitterStrategy(
    twitterOptions,
    function(accessToken, refreshToken, profile, done) {
        return done(null, true);
    }
);

passport.use('twitter', strategy);