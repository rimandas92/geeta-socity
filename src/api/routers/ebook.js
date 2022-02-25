import { Router } from 'express';
import { Joi, celebrate, Segments, errors } from 'celebrate';
import {
  createEbook,
  getEbookList,
  createReview,
  deleteEbook,
  deleteEbooks,
  updateEbook,
  geteBookById,
  updatePriority,
  // getCategoryList
} from '../../services/ebook';
import upload from '../../utils/upload';
/**
 * This router to auth user
 */
export default (app) => {
  const router = Router();
  app.use('/ebook', router);

  router.route('/create').post(upload.any(), createEbook);
  router.route('/edit/:id').post(
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(),
      }),
    }),
    upload.any(),
    updateEbook
  );
  router.route('/delete/:id').get(
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(),
      }),
    }),
    deleteEbooks
  );
  router.route('/get/:id').get(
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(),
      }),
    }),
    geteBookById
  );
  router.route('/review/create').post(
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        ebookId: Joi.string().required(),
        // reviews: Joi.string().required(),
        description: Joi.string().required(),
        name: Joi.string().required(),
        designation: Joi.string().required(),
      }),
    }),
    createReview
  );
  router.route('/').get(getEbookList);
  router.route('/update-priority').post(
    // celebrate({
    //   [Segments.PARAMS]: Joi.object().keys({
    //     id: Joi.string().required(),
    //   }),
    // }),
    updatePriority
  );
  // router.route('/category').get(getCategoryList);
};
