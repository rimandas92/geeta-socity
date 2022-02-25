const { OAuth2Client } = require('google-auth-library');
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID, '', '');
import {encrypt} from './password_handler';

/**
 * Functionality used to fetch user profile from Google
 * @param {*} idToken Google token_id
 * @returns {Object} social profile
 */
export const getGoogleUser = async(idToken) => {
  try {
    const login = await client.verifyIdToken({
      idToken: idToken,
      audience: GOOGLE_CLIENT_ID
    });
    const payload = await login.getPayload();
    const audience = payload.aud;
    if (audience !== GOOGLE_CLIENT_ID) {
      throw new Error(
        'error while authenticating google user: audience mismatch: wanted [' +
          GOOGLE_CLIENT_ID +
          '] but was [' +
          audience +
          ']'
      );
    }
    console.log(payload);
    return {
        firstName: payload['given_name'],
        lastName: payload['family_name'],
        email: payload['email'],
        password: String(payload['sub'])
      };
  } catch (err) {
    return new Error(
      'error while authenticating google user: ' + JSON.stringify(err)
    );
  }
};

module.exports = {
  getGoogleUser
};