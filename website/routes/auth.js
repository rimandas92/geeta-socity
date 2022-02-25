import express from 'express';
import authController from '../controller/auth';
import homeController from '../controller/home';
import pages from '../controller/pages';

const router = express.Router();

router.get('/login', authController.getLogin);
router.get('/forget-password', authController.forgetAdminPassword);
router.get('/dashboard', authController.dashboard);
router.get('/dashboard/users', homeController.allUsers);
router.get('/dashboard/ebook', homeController.ebook);
router.get('/dashboard/ebook/create', homeController.create);
router.get('/dashboard/ebook/edit/:id', homeController.editEbook);
// router.get('/dashboard/make', homeController.make);
router.get('/dashboard/audio', homeController.allAudio);
router.get('/dashboard/banner', homeController.allBanner);
router.get('/dashboard/pages',pages.index);
router.get('/dashboard/pages/create',pages.create);
router.get('/dashboard/pages/:id/edit',pages.edit);
router.get('/dashboard/ebook/search?:keyword',homeController.ebook);
router.get('/dashboard/audio/search?:keyword',homeController.searchAudioBook);
router.get('/dashboard/banner/search?:keyword', homeController.allBanner);
router.get('/dashboard/review', homeController.ratingAndReview);
router.get('/dashboard/review/:bookId', homeController.ratingAndReview);
router.get('/dashboard/category', homeController.category);
router.get('/', (req, res)=>{
  res.redirect('/admin/login');
});

module.exports = router;
