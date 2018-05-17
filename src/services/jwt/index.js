import jwt from 'jsonwebtoken'
import Promise from 'bluebird'
import { jwtSecret } from '../../config'

const jwtSign = Promise.promisify(jwt.sign)
const jwtVerify = Promise.promisify(jwt.verify)

// var token = jwt.sign({ sub: 'admin',
//   auth: 'ROLE_ADMIN,ROLE_USER',
//   exp: (new Date() / 1000) + 3600 }, new Buffer(secret, 'base64'), { algorithm: 'HS512'});

export const sign = (id, options, method = jwtSign) =>
  method({ id }, jwtSecret, options)

export const signSync = (id, options) => sign(id, options, jwt.sign)

export const verify = (token) => jwtVerify(token, jwtSecret)
