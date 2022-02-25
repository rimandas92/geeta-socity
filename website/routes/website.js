import express from 'express';
import authController from '../controller/auth';
import homePage from '../controller/home';
import user from '../controller/user';

const router = express.Router();

router.get('/', homePage.index);
// router.get('/signin', authController.getLoginUser);
// router.get('/forget', authController.forgetPassword);
// router.get('/signup', authController.getRegisterUser);
// router.post('/auth/social/apple/signup', authController.getAppleSignup);
// router.post('/auth/social/apple/login', authController.getAppleLogin);
// router.get('/about', homePage.about);
// router.get('/privacy', homePage.privacy);
// router.get('/terms', homePage.terms);
// router.get('/faq', homePage.faq);
// router.get('/howitsworks', homePage.howitsworks);
// router.get('/user/dashboard',user.userDashboard);
// router.get('/user/edit',user.editAccount);
// router.get('/user/:id/driving',user.driving);
// router.get('/user/:id/gunpermit',user.gunPrimit);
// router.get('/user/:id/social',user.social);
// router.get('/user/:id/licence-number',user.licenceNumber);
// router.get('/user/:id/registration',user.registration);
// router.get('/user/:id/insurance',user.insurance);
// router.get('/user/:id/inspection',user.inspection);
// router.get('/user/:id/make-model',user.make_model);


router.get('/', (req, res)=>{
  res.redirect('/');
});

module.exports = router;
