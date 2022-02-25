import * as jwt from 'jsonwebtoken';
import config from '../config';
import { getUserById } from '../controller/user';

/**
 * Functionality used to generate a token on successful login
 * @argument {user} user object
 * @returns {String} Token
 */
export const generate = async(user) => {

  try {
    const payload = {
      email: user.email,
      id: user._id,
      role: user.role
    };
    return await jwt.sign(payload, config.jwt.secret);
  } catch (err) {
    throw err;
  }
};

/**
 * Functionality used to verify/decode a token
 * @argument {token} token, Token
 * @argument {id} id User id
 * @returns {Boolean} True or false
 */
export const verifyUser = async(token) => {
  try {
    const userData = await getUserById(token.id);
    if (!userData) return;
    return (token.id.toString() === userData._id.toString());
  } catch (err) {
    throw err;
  }
};

module.exports = {
  generate,
  verifyUser
};
