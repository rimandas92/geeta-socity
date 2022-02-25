import Cryptr from 'cryptr';
import config from '../config';

const cryptr = new Cryptr(config.CRYPTR_KEY.SECRET);

/**
 * Functionality used to encrypt user password
 * @param {*} password password
 * @returns {String} it returns encrypted password
 */
export const encrypt = async(password) => {
  try {
    return await cryptr.encrypt(password);
  } catch (err) {
    throw err;
  }
};

/**
 * Functionality used to decrypt user password
 * @param {*} encryptedPassword encryptedPassword value
 * @returns {String} it returns decrypted password
 */
export const decrypt = async(encryptedPassword) => {
  try {
    return await cryptr.decrypt(encryptedPassword);
  } catch (err) {
    throw err;
  }
};

export const getRandomString = () => Math.random().toString(config.STRING_BASE_THIRTY_SIX).slice(config.GET_LAST_TEN_CHAR);

module.exports = {
  encrypt,
  decrypt,
  getRandomString,
};
