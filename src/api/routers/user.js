import { Router } from 'express';
import { Joi, celebrate, Segments, errors } from 'celebrate';
import { register } from '../../services/auth';
import {
  getUsersList,
  updateUser,
  deleteUser,
  getUser,
  addDocument,
  addDocumentDetails,
  getDocumentList,
  getDocumentDetail,
  getMakeModelDetails,
  location,
  pullover,
  getPullover,
  deletePullOver,
  profileUpload,
  getPulloverByUsersId,
  carImageUpload,
  savePullOver,
  getsavePullOver,
  getPulloverBycops,
} from '../../services/user';
import permit from '../../middleware/authorization';
import upload from '../../utils/upload';
Joi.objectId = require('joi-objectid')(Joi);

/**
 * This router to auth user
 */
export default (app) => {
  const router = Router();
  app.use('/users', router);

  router.route('/all').get(permit('admin'), getUsersList);
  router.route('/:id/edit').post(
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(),
      }),
      [Segments.BODY]: Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        dateOfBirth: Joi.date().allow(null, ''),
      }),
    }),
    updateUser
  );
  router.route('/document/details/:id').post(
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(),
      }),
      [Segments.BODY]: Joi.object().keys({
        socilaSecurity: Joi.string().allow(null, ''),
        carDetails: Joi.object().allow(null, ''),
        licensePlateNumber: Joi.string().allow(null, ''),
        state: Joi.array().allow(null),
      }),
    }),
    addDocumentDetails
  );
  router.route('/document/details/:id').get(
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(),
      }),
    }),
    getDocumentDetail
  );
  router.route('/make-model/details/:id').get(
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(),
      }),
    }),
    getMakeModelDetails
  );
  router.route('/document/:type/:id').post(
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(),
        type: Joi.string().valid('personal', 'vehicle'),
      }),
    }),
    upload.any(),
    addDocument
  );
  router.route('/location').post(
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        location: Joi.array().allow(null, ''),
      }),
    }),
    location
  );
  router.route('/pullover').post(
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        userId: Joi.objectId(),
        reason: Joi.string().required(),
      }),
    }),
    permit('cops'),
    pullover
  );
  router.route('/pullover').get(getPullover);
  router.route('/cops/pullover').get(getPulloverBycops);
  router.route('/pullover/:userId').get(
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        userId: Joi.string().required(),
      }),
    }),
    getPulloverByUsersId
  );
  router.route('/pullover/:id').post(
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(),
      }),
    }),
    deletePullOver
  );
  router.route('/pullover/save/:id').post(
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(),
      }),
      [Segments.BODY]: Joi.object().keys({
        status: Joi.boolean().required(),
      }),
    }),
    savePullOver
  );
  router.route('/save/pullover').get(getsavePullOver);
  router.route('/document/list/:id').get(
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(),
      }),
    }),
    getDocumentList
  );
  router.route('/:id').get(
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(),
      }),
    }),
    getUser
  );
  router.route('/:id/delete').get(
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(),
      }),
    }),
    permit('admin'),
    deleteUser
  );
  router.route('/profile/:id').post(
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(),
      }),
    }),
    upload.any(),
    profileUpload
  );
  router.route('/car-image/:id').post(
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(),
      }),
    }),
    upload.any(),
    carImageUpload
  );

  app.use(errors());
};
