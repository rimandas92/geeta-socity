import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import adminRoutes from '../../website/routes/auth';
import website from '../../website/routes/website';
import router from '../api';
import { CONSTANT } from '../constants';
import { verifyToken } from '../middleware/interceptor';
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../../website/view'));

app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(morgan('dev'));
app.use('/admin', adminRoutes);
console.log("AAAAAAAAAA",router);
app.use(
  '/api/v1/',
  verifyToken.unless({
    path: CONSTANT.JWT_ALLOWED_URLS,
  }),
  router
);
app.use(express.static(path.join(__dirname, '../../public')));
app.use('/ui',express.static(path.join(__dirname + '../../../public/design')));
app.use('/css', express.static(path.join(__dirname + '../../public/css')));
app.use('/js', express.static(path.join(__dirname + '../../public/js')));
app.use('/img', express.static(path.join(__dirname + '../../public/images')));
app.use('/uploads', express.static(path.join(__dirname + '../../public/uploads')));
app.use('/', website);
// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options('*', cors());

export default app;
