import {Router} from 'express';
import {Joi, celebrate, Segments, errors} from 'celebrate';
import permit from '../../middleware/authorization';
import { addpage, deletePage, getPages ,editPages, getPagesByName} from '../../services/page';


/**
 * This router to pages
 */
export default (app) =>{
    const router = Router();
    app.use('/pages', router);
  
    router.route('/').get(permit('admin') ,getPages);
    router.route('/').post(
        celebrate({
            [Segments.BODY]: Joi.object().keys({
                title: Joi.string().required(),
                body: Joi.string().required(),
            })
        }),
        permit('admin') ,
        addpage
    );
    router.route('/edit/:id').post(
        celebrate({
            [Segments.PARAMS]:Joi.object().keys({
                id: Joi.string().required()
            }),
            [Segments.BODY]: Joi.object().keys({
                title: Joi.string().required(),
                body: Joi.string().required(),
            })
        }),
        permit('admin') ,
        editPages
    );
    router.route('/:id/delete').get(
        celebrate({
            [Segments.PARAMS]:Joi.object().keys({
                id: Joi.string().required()
            }),
        }),
        permit('admin'),
        deletePage
    );
    router.route('/:name').get(
        celebrate({
            [Segments.PARAMS]:Joi.object().keys({
                name: Joi.string().required()
            }),
        }),
        getPagesByName
    );
    app.use(errors());
};