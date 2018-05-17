import passport from 'passport'
import { Schema } from 'bodymen'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { jwtSecret, masterKey } from '../../config'

export const token = ({ required, roles } = {}) => (req, res, next) =>
  passport.authenticate('token', { session: false }, (err, user, info) => {
    console.log('Trigger token filter Err', err, 'User', user, 'Info', info, 'Roles', roles);
    if (err || (required && !user) || (required && !~roles.indexOf(user.role))) {
      return res.status(401).end()
    }
    req.logIn(user, { session: false }, (err) => {
      if (err) return res.status(401).end()
      next()
    })
  })(req, res, next)


passport.use('token', new JwtStrategy({
  secretOrKey: Buffer.from(jwtSecret, 'base64'),
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromUrlQueryParameter('access_token'),
    ExtractJwt.fromBodyField('access_token'),
    ExtractJwt.fromAuthHeaderWithScheme('Bearer')
  ])
}, ( { auth, sub }, done) => done(null, { username: sub, role: (auth.indexOf('ROLE_ADMIN') != -1 )? 'admin' : ((auth.indexOf('ROLE_USER') != -1) ? 'user' : 'anonymous') })));
