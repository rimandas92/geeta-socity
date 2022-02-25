import { BAD_REQUEST, CREATED, FORBIDDEN, OK, UNAUTHORIZED } from 'http-status';
import {
  deleteUsers,
  getUserById,
  getUserList,
  updateUserById,
  addDocuments,
  addDocumentsDetails,
  getDocumentLists,
  getDocumentsDetails,
  getMakeModelDetail,
  updateLocation,
  addPullOver,
  getPullOver,
  deletePullOvers,
  getPulloverByUserId,
  uploadProfilePic,
  uploadCarImage,
  savePullOvers,
  getsavedPullOver,
  getPullOverByCop,
} from '../controller/user';
import { getUserData } from '../middleware/getUserData';
import user from '../models/user';
const fs = require('fs');
const { promisify } = require('util');

const unlinkAsync = promisify(fs.unlink);
export const updateUser = async (req, res, next) => {
  try {
    const _id = req.params.id;
    if (!_id) {
      return res.status(FORBIDDEN).send({ message: 'Something went wrong' });
    }
    const updatedUser = await updateUserById(_id, req.body);
    return res.status(OK).send({
      message: 'Profile updated successfully',
      status: true,
      user: updatedUser,
    });
  } catch (error) {
    next(error);
    return res.status(BAD_REQUEST).send({ status: false, error: error });
  }
};
export const getUsersList = async (req, res, next) => {
  try {
    const UserList = await getUserList();
    if (!UserList) {
      return res.status(OK).send({ users: [] });
    }
    return res
      .status(OK)
      .send({ message: 'Data fetched', status: true, users: UserList });
  } catch (error) {
    next(error);
    return 'Error';
  }
};
export const deleteUser = async (req, res, next) => {
  try {
    const _id = req.params.id;
    if (!_id) {
      return res.status(FORBIDDEN).send({ message: 'Something went wrong' });
    }
    const deletedUser = await deleteUsers(_id);
    return res.status(OK).send({ status: true, message: deletedUser });
  } catch (error) {
    next(error);
    return res.status(BAD_REQUEST).send({ status: false, error: error });
  }
};
export const getUser = async (req, res, next) => {
  try {
    const _id = req.params.id;
    if (!_id) {
      return res.status(FORBIDDEN).send({ message: 'Something went wrong' });
    }
    const user = await getUserById(_id);
    return res
      .status(OK)
      .send({ message: 'Data fetched', status: true, user: user });
  } catch (error) {
    next(error);
    return res.status(BAD_REQUEST).send({ status: false, error: error });
  }
};
export const addDocument = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const type = req.params.type;
    if (!_id && !type) {
      return res.status(FORBIDDEN).send({ message: 'Something went wrong' });
    }
    const userExit = await user.findById(_id);
    if (!userExit) {
      // Delete the file like normal
      await req.files.map(async (files) => {
        await unlinkAsync(files.path);
      });
      throw 'User not exit';
    }
    let documentType = [
      'driverLicense',
      'driverPhoto',
      'socialSecurityNumber',
      'gunPermit',
      'registration',
      'insurance',
      'inspection',
    ];
    console.log(req.files);
    if (!documentType.includes(req.files[0].fieldname)) {
      throw 'Please enter valid document';
    }
    const document = await addDocuments(_id, req.files, type);
    return res.status(OK).send({
      message: 'Document uploaded successfully',
      status: true,
      user: document,
    });
  } catch (error) {
    next(error);
    return res.status(BAD_REQUEST).send({ status: false, error: error });
  }
};

export const addDocumentDetails = async (req, res, next) => {
  try {
    const _id = req.params.id;
    if (!_id) {
      return res.status(FORBIDDEN).send({ message: 'Something went wrong' });
    }
    const userExit = await user.findById(_id);
    if (!userExit) {
      throw 'User not exit';
    }
    const document = await addDocumentsDetails(_id, req.body);
    return res.status(OK).send({
      message: 'Data updated successfully',
      status: true,
      user: document,
    });
  } catch (error) {
    next(error);
    return res.status(BAD_REQUEST).send({ status: false, error: error });
  }
};
export const getDocumentDetail = async (req, res, next) => {
  try {
    const _id = req.params.id;
    if (!_id) {
      return res.status(FORBIDDEN).send({ message: 'Something went wrong' });
    }
    const userExit = await user.findById(_id);
    if (!userExit) {
      throw 'User not exit';
    }
    const document = await getDocumentsDetails(_id);
    return res
      .status(OK)
      .send({ message: 'Data fetched', status: true, user: document });
  } catch (error) {
    next(error);
    return res.status(BAD_REQUEST).send({ status: false, error: error });
  }
};
export const getMakeModelDetails = async (req, res, next) => {
  try {
    const _id = req.params.id;
    if (!_id) {
      return res.status(FORBIDDEN).send({ message: 'Something went wrong' });
    }

    const make_model = await getMakeModelDetail(_id);
    return res
      .status(OK)
      .send({ message: 'Data fetched', status: true, data: make_model });
  } catch (error) {
    next(error);
    return res.status(BAD_REQUEST).send({ status: false, error: error });
  }
};

export const getDocumentList = async (req, res, next) => {
  try {
    const _id = req.params.id;
    if (!_id) {
      return res.status(FORBIDDEN).send({ message: 'Something went wrong' });
    }
    const userExit = await user.findById(_id);
    if (!userExit) {
      throw 'User not exit';
    }
    const document = await getDocumentLists(_id);
    return res
      .status(OK)
      .send({ message: 'Data fetched', status: true, document: document });
  } catch (error) {
    next(error);
    return res.status(BAD_REQUEST).send({ status: false, error: error });
  }
};
export const location = async (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];
  try {
    const userData = await getUserData(token);
    if (!userData) {
      return res.status(FORBIDDEN).send({ message: 'Something went wrong' });
    }
    const userExit = await user.findById(userData.id);
    if (!userExit) {
      throw 'User not exit';
    }
    const location = await updateLocation(
      userData.id,
      req.body.location[0].coords
    );
    return res
      .status(OK)
      .send({ message: 'Data fetched', status: true, user: location });
  } catch (error) {
    next(error);
    return res.status(BAD_REQUEST).send({ status: false, error: error });
  }
};
export const pullover = async (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];
  const { userId, reason } = req.body;
  try {
    const userData = await getUserData(token);
    if (!userData) {
      return res.status(FORBIDDEN).send({ message: 'Something went wrong' });
    }
    const userExit = await user.findById(userId);
    if (!userExit) {
      throw 'User not exit';
    }
    const pullOver = await addPullOver({
      userId: userId,
      reason: reason,
      createdBy: userData.id,
    });
    return res.status(OK).send({
      message: 'Added pull over',
      status: true,
      pullOver: pullOver,
    });
  } catch (error) {
    next(error);
    return res.status(BAD_REQUEST).send({ status: false, error: error });
  }
};
export const getPullover = async (req, res, next) => {
  try {
    const pullOver = await getPullOver();
    return res.status(OK).send({
      message: 'Data fetched',
      status: true,
      pullOver: pullOver,
    });
  } catch (error) {
    next(error);
    return res.status(BAD_REQUEST).send({ status: false, error: error });
  }
};
export const getPulloverBycops = async (req, res, next) => {
  try {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    const userData = await getUserData(token);
    const pullOver = await getPullOverByCop(userData.id);
    return res.status(OK).send({
      message: 'Data fetched',
      status: true,
      pullOver: pullOver,
    });
  } catch (error) {
    next(error);
    return res.status(BAD_REQUEST).send({ status: false, error: error });
  }
};
export const getPulloverByUsersId = async (req, res, next) => {
  try {
    const pullOver = await getPulloverByUserId(req.params.userId);
    return res.status(OK).send({
      message: 'Data fetched',
      status: true,
      pullOver: pullOver,
    });
  } catch (error) {
    next(error);
    return res.status(BAD_REQUEST).send({ status: false, error: error });
  }
};
export const deletePullOver = async (req, res, next) => {
  try {
    const pullOver = await deletePullOvers(req.params.id);
    return res.status(OK).send({
      message: 'Data fetched',
      status: true,
      pullOver: pullOver,
    });
  } catch (error) {
    next(error);
    return res.status(BAD_REQUEST).send({ status: false, error: error });
  }
};

export const savePullOver = async (req, res, next) => {
  try {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    const userData = await getUserData(token);
    const pullOver = await savePullOvers(req.params.id, userData, req.body.status);
    return res.status(OK).send({
      message: 'Data fetched',
      status: true,
      pullOver: pullOver,
    });
  } catch (error) {
    next(error);
    return res.status(BAD_REQUEST).send({ status: false, error: error });
  }
};
export const getsavePullOver = async (req, res, next) => {
  try {
    console.log(req.body);
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    const userData = await getUserData(token);
    const pullOver = await getsavedPullOver(userData.id);
    return res.status(OK).send({
      message: 'Data fetched',
      status: true,
      pullOver: pullOver,
    });
  } catch (error) {
    next(error);
    return res.status(BAD_REQUEST).send({ status: false, error: error });
  }
};


export const profileUpload = async (req, res, next) => {
  try {
    const _id = req.params.id;
    if (!_id) {
      return res.status(FORBIDDEN).send({ message: 'Something went wrong' });
    }
    const data = await user.findById(_id);
    // console.log(req.files)
    if (data.profileImage) {
      // // Delete the file like normal
      await unlinkAsync(data.profileImage.path).catch((err) => {
        console.log(err);
      });
    }
    const document = await uploadProfilePic(_id, {
      uri: `/uploads/${req.files[0].filename}`,
      path: req.files[0].path,
    });
    const updatedUser = await user.findById(_id);
    return res.status(OK).send({
      message: 'Document uploaded successfully',
      status: true,
      user: updatedUser,
    });
  } catch (error) {
    next(error);
    return res.status(BAD_REQUEST).send({ status: false, error: error });
  }
};
export const carImageUpload = async (req, res, next) => {
  try {
    const _id = req.params.id;
    if (!_id) {
      return res.status(FORBIDDEN).send({ message: 'Something went wrong' });
    }
    const data = await user.findById(_id);
    // console.log(req.files)
    if (data.carImage) {
      // // Delete the file like normal
      await unlinkAsync(data.carImage.path).catch((err) => {
        console.log(err);
      });
    }
    await uploadCarImage(_id, {
      uri: `/uploads/${req.files[0].filename}`,
      path: req.files[0].path,
    });
    const updatedUser = await user.findById(_id);
    return res.status(OK).send({
      message: 'Document uploaded successfully',
      status: true,
      user: updatedUser,
    });
  } catch (error) {
    next(error);
    return res.status(BAD_REQUEST).send({ status: false, error: error });
  }
};
