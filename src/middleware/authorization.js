// middleware for doing role-based permissions
import { UNAUTHORIZED } from 'http-status';
import * as jwt from 'jsonwebtoken';
import config from '../config';
export default function permit(...permittedRoles) {
    // return a middleware
    return (request, response, next) => {
        let token = request.headers['x-access-token'] || request.headers['authorization'];
        token = token.slice(7, token.length).trimLeft();
        const user = jwt.verify(token, config.jwt.secret);
      if (user && permittedRoles.includes(user.role)) {
        next(); // role is allowed, so continue on the next middleware
      } else {
        response.status(UNAUTHORIZED).json({message: 'Forbidden'}); // user is forbidden
      }
    };
  }