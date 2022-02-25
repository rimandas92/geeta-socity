import { Router } from 'express';
import { Joi, celebrate, Segments, errors } from 'celebrate';
import permit from '../../middleware/authorization';
import {
  addBanner,
  deletePage,
  getPages,
  editPages,
  getPagesByName,
  getBanners,
  deleteBanner,
} from '../../services/banner';
import uploadBanner from '../../utils/uploadBanner';

/**
 * This router to banner
 */
export default (app) => {
  const router = Router();
  app.use('/banner', router);

  router.route('/').get( getBanners);
  router.route('/').post(uploadBanner.any(), addBanner);
  router.route('/edit/:id').post(
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(),
      }),
      [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        body: Joi.string().required(),
      }),
    }),
    permit('admin'),
    editPages
  );
  router.route('/:id/delete').get(
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(),
      }),
    }),
    permit('admin'),
    deleteBanner
  );
  router.route('/:name').get(
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        name: Joi.string().required(),
      }),
    }),
    getPagesByName
  );
  app.use(errors());
};
