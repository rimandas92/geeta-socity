import * as jwt from 'jsonwebtoken';

import unless from 'express-unless';
import { verifyUser } from '../utils/token_handler';
import config from '../config';
import { UNAUTHORIZED } from 'http-status';

/**
 * Interceptor which verifies the jwt token before allowing requests
 * @returns {Boolean} it returns a boolean value which indicates
 * the token is valid
 * @param {*} req request from the client
 * @param {*} res request to the client from server
 * @param {*} next middleware to next request
 */
export const verifyToken = async (req, res, next) => {
  try {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    // Express headers are auto converted to lowercase
    if (
      req.headers.authorization &&
      req.headers.authorization.split(' ')[0] !== 'Bearer'
    ) {
      return res
        .status(UNAUTHORIZED)
        .send({ message: 'Please login to continue' });
    }
    token = token.slice(7, token.length).trimLeft();

    const jwtverify = await jwt.verify(token, config.jwt.secret);
    const isVerified = await verifyUser(jwtverify);
    if (!isVerified) {
      return res.status(UNAUTHORIZED).send({ message: 'Invalid token' });
    }
    return next();
  } catch (err) {
    return res.status(UNAUTHORIZED).send({ message: 'Invalid token' });
  }
};

verifyToken.unless = unless;

module.exports = {
  verifyToken,
};
