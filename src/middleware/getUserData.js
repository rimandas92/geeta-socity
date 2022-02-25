import * as jwt from 'jsonwebtoken';
import config from '../config';
export const getUserData = async (token) => {
  token = token.slice(7, token.length).trimLeft();
  const jwtverify = await jwt.verify(token, config.jwt.secret);
  return jwtverify;
};
