import {Router} from 'express';
import {Joi, celebrate, Segments, errors} from 'celebrate';
import { register, login, forget, socilaSignup, socilaLogin, googleSignUp ,googleSignIn, appleSignUp,appleSignIn} from '../../services/auth';


/**
 * This router to auth user
 */
export default (app) =>{
    const router = Router();
    app.use('/auth', router);
  
    router.route('/signup').post(
        celebrate({
            [Segments.BODY]: Joi.object().keys({
                email: Joi.string().required(),
                password: Joi.string().required(),
                firstName: Joi.string().required(),
                lastName: Joi.string().required(),
                dateOfBirth: Joi.date(),
                role:Joi.string().default('user')
            })
        }),
        register
    );
    router.route('/social/signup/:platform').post(
        celebrate({
            [Segments.PARAMS]:Joi.object().keys({
                platform : Joi.string().valid('google','apple').required(),
            }),
            [Segments.BODY]: Joi.object().keys({
                token: Joi.string().required(),
                role:Joi.string().default('user')
            })
        }),
        socilaSignup
    );
    router.route('/social/signup/v1/apple').post(
        celebrate({
            [Segments.BODY]: Joi.object().keys({
                email: Joi.string().required(),
                firstname :Joi.string().required(),
                lastname :Joi.string().required(),
                userId :Joi.string().required(),
                role:Joi.string().default('user')
            })
        }),
        appleSignUp
    );
    router.route('/social/signin/v1/apple').post(
        celebrate({
            [Segments.BODY]: Joi.object().keys({
                email: Joi.string().required(),
                userId :Joi.string().required(),
            })
        }),
        appleSignIn
    );
    router.route('/social/:platform').post(
        celebrate({
            [Segments.PARAMS]:Joi.object().keys({
                platform : Joi.string().valid('google','apple').required(),
            }),
            [Segments.BODY]: Joi.object().keys({
                token: Joi.string().required(),
                role:Joi.string().default('user')
            })
        }),
        socilaSignup
    );
    router.route('/social/login/:platform').post(
        celebrate({
            [Segments.PARAMS]:Joi.object().keys({
                platform : Joi.string().valid('google','apple').required(),
            }),
            [Segments.BODY]: Joi.object().keys({
                token: Joi.string().required(),
            })
        }),
        socilaLogin
    );
    router.route('/social/v1/google/signup').post(
        celebrate({
            [Segments.BODY]: Joi.object().keys({
                email: Joi.string().required(),
                name: Joi.string().required(),
                id: Joi.string().required(),
            })
        }),
        googleSignUp
    );
    router.route('/social/v1/google/signin').post(
        celebrate({
            [Segments.BODY]: Joi.object().keys({
                email: Joi.string().required(),
                id: Joi.string().required(),
            })
        }),
        googleSignIn
    );
    router.route('/login').post(
        celebrate({
            [Segments.BODY]: Joi.object().keys({
                email: Joi.string().required(),
                password: Joi.string().required(),
            })
        }),
        login
    );
    router.route('/forget').post(
        celebrate({
            [Segments.BODY]: Joi.object().keys({
                email: Joi.string().required(),
            })
        }),
        forget
    );
    app.use(errors());
};