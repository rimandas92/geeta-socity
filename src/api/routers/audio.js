import { Router } from 'express';
import { Joi, celebrate, Segments, errors } from 'celebrate';
import audioUpload from '../../utils/audioUpload';
import { createAudioBooks, deleteAudioBooks, editAudiobooks, getAudioBook, getAudioBookAll, getAudioBookById, updateAudioBookPriority, getAudioListByCategoryId } from '../../services/audiobook';
/**
 * This router to audio book
 */
export default (app) => {
  const router = Router();
  app.use('/books/audio', router);
  router.route('/create').post(audioUpload.any(), createAudioBooks);
  router.route('/edit/:id').post(
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(),
      }),
    }),
    audioUpload.any(),
    editAudiobooks
  );
    router.route('/get/:id').get(
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(),
      }),
    }),
    getAudioBookById
  );
  router.route('/delete/:id').get(
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(),
      }),
    }),
    deleteAudioBooks
  );
  router.route('/:category').get(
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        category: Joi.string().required(),
      }),
    }),
    getAudioBook
  );
  router.route('/').get(

    getAudioBookAll
  );
  router.route('/update-audio-book-priority').post(
    updateAudioBookPriority
  );
  router.route('/audio-list-category/:id').get(
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(),
      }),
    }),
    getAudioListByCategoryId
  );


};
