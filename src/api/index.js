import {Router} from 'express';
import audio from './routers/audio';
import auth from './routers/auth';
import banner from './routers/banner';
import ebook from './routers/ebook';
import page from './routers/page';
import user from './routers/user';
import category from './routers/category';

const router = Router();


auth(router);
user(router);
ebook(router);
audio(router);
page(router);
banner(router);
category(router);


export default router;
