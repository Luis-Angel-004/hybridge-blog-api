import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { JWT_SECRET } from '../config.js';
import * as UserService from '../services/user.service.js';

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
};

export const jwtStrategy = new JwtStrategy(options, (payload, done) => {
    const user = UserService.findById(payload.sub);

    if (user) {
        return done(null, user);
    }
    return done(null, false);
});

export const auth = passport.authenticate('jwt', { session: false });