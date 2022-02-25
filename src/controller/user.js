
import User from '../models/user';
import { isEmpty } from '../utils/condition';
import { encrypt } from '../utils/password_handler';
import { generate } from '../utils/token_handler';
const fs = require('fs');
const { promisify } = require('util');
const mongoose = require('mongoose');
const unlinkAsync = promisify(fs.unlink);
export const register_user = async (newUser) => {
  try {
    // Check if the user exists
    const userExist = await User.findOne({
      email: newUser.email,
    });
    if (userExist) {
      throw `User with email ${newUser.email} already exists`;
    }

    // Generate the hash
    newUser.hash = await encrypt(newUser.password);

    const user = new User(newUser);
    const savedUser = await user.save();
    const token = await generate(savedUser);
    return {
      newUser: savedUser,
      token: token,
    };
  } catch (err) {
    throw err;
  }
};

/**
 * Functionality used to get the details of a particular user
 * from the database
 * @param {*} userId user unique id value
 * @returns {Object} user
 */
export const getUserById = async (userId) => {
  try {
    if (!userId) {
      throw 'Mandatory parameters missing';
    }

    return await User.findOne({
      _id: userId,
    })
      .select('-hash')
      .lean();
  } catch (err) {
    throw err;
  }
};
/**
 * Functionality used to get the details of a particular user
 * from the database
 * @param {*} email user unique id value
 * @returns {Object} user
 */
export const findUserByEmail = async (email) => {
  try {
    if (!email) {
      throw 'Mandatory parameters missing';
    }
    return await User.findOne({
      email: email,
    }).lean();
  } catch (err) {
    throw err;
  }
};
/**
 * Functionality used to get all the user
 * from the database
 * @param {*} email user unique id value
 * @returns {Object} user
 */
export const getUserList = async () => {
  try {
    return await User.find({
      role: { $ne: 'admin' },
      status: { $eq: 'active' },
    }).lean();
  } catch (err) {
    throw err;
  }
};
/**
 * Functionality used to remove the user
 * from the database
 * @param {*} _id user unique id value
 * @returns {Object} user
 */
export const deleteUsers = async (_id) => {
  try {
    await User.findByIdAndUpdate(_id, {
      status: 'inactive',
    });
    return 'User Deleted successfully';
  } catch (err) {
    throw err;
  }
};
/**
 * Functionality used to get all the user
 * from the database
 * @param {*} _id user unique id value
 * @returns {Object} user
 */
export const updateUserById = async (_id, updateUser) => {
  try {
    const userExit = await User.findById(_id);
    if (!userExit) {
      throw 'User not exit';
    }
    await User.findByIdAndUpdate(_id, { $set: updateUser });
    return await User.findById(_id).lean();
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getUserById,
  register_user,
  findUserByEmail,
  getUserList,
  updateUserById,
  deleteUsers,

};
