import {Router} from "express";
import passport from "passport";
import {login, facebookCallback, twitterCallback} from "../controllers/auth";


const router = Router();


router.post('/', passport.authenticate('local', {session: false}), login);
router.get('/facebook', passport.authenticate('facebook'));
router.get('/facebook/callback', passport.authenticate('facebook'), facebookCallback);
router.get('/twitter', passport.authenticate('twitter'));
router.get('/twitter/callback', passport.authenticate('twitter'), twitterCallback);

export default router;