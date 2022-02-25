const { default: audiobook } = require('../../src/models/audiobook');
const { default: ebook } = require('../../src/models/ebook');
const { default: reviews } = require('../../src/models/reviews');
const { default: user } = require('../../src/models/user');
const { default: banner } = require('../../src/models/banner');
const { default: page } = require('../../src/models/page');
const { default: category } = require('../../src/models/category');

exports.getLogin = (req, res) => {
  res.render('pages/admin/login/login', {
    path: './login',
    pageTitle: 'Login',
    errorMessage: 'errorMessage',
  });
};
exports.forgetAdminPassword = (req, res) => {
  res.render('pages/admin/forget/forgetPassword', {
    path: './login',
    pageTitle: 'Login',
    errorMessage: 'errorMessage',
  });
};
exports.getLoginUser = (req, res) => {
  res.render('pages/users/login', {
    path: './login',
    pageTitle: 'Login',
    errorMessage: 'errorMessage',
  });
};
exports.forgetPassword = (req, res) => {
  res.render('pages/users/forget', {
    path: './login',
    pageTitle: 'Forget',
    errorMessage: 'errorMessage',
  });
};
exports.getRegisterUser = (req, res) => {
  res.render('pages/users/signup', {
    path: './login',
    pageTitle: 'Login',
    errorMessage: 'errorMessage',
  });
};
exports.getAppleSignup = (req, res) => {
  console.log(req.body);
  // req.body.id_token = 'eyJraWQiOiI4NkQ4OEtmIiwiYWxnIjoiUlMyNTYifQ.eyJpc3MiOiJodHRwczovL2FwcGxlaWQuYXBwbGUuY29tIiwiYXVkIjoiY29tLmludHJvLnNpZ25pbiIsImV4cCI6MTYxNDkyMzYyNCwiaWF0IjoxNjE0ODM3MjI0LCJzdWIiOiIwMDIwMDkuZDAwNzk0NDM4MWI5NDY2Y2E0ZWQ5ZmJkYjI2ZmY5ZDcuMTY1NCIsImNfaGFzaCI6IkVDME9LalhFSHZ2SkhQTWxkU2wyTWciLCJlbWFpbCI6ImRvbmFyaWNoMDRAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOiJ0cnVlIiwiYXV0aF90aW1lIjoxNjE0ODM3MjI0LCJub25jZV9zdXBwb3J0ZWQiOnRydWV9.hnFwjaubNu1yylbS_0gRVdOUHGy-mf4fgBPmsOLX9_5lpKlFVrogPjMyiufH1gg1DbpAxKyEW2h4XNsPraW7XJoI0j0Z0ll9wdHcyAi5lnbWjmTH3IApNYXlqfDbYwRg9nH9QYEd7P-Ba2algGAkHHgZwrzo_berlTrXw2q-hFPr_1ZppbY11mr13xoOfEj-7ZoZhzCoClChIZkhee6LPnmBrp6nQ5gd6xAuTt2Hi6vLNvIN0vAyAviX6a3Pgf9lKd9ByO_T5O9QMhbOgwOZYpf6nmbTYlNj9KZ9Atmh8dWJk7BFzxivJ445_gnC7KFCZuO1EY_A2uGTB2juqhozIw'
  res.render('pages/users/loader', {
    path: './login',
    pageTitle: 'Login',
    token: req.body.id_token,
    errorMessage: 'errorMessage',
  });
};
exports.getAppleLogin = (req, res) => {
  console.log(req.body);
  // req.body.id_token = 'eyJraWQiOiI4NkQ4OEtmIiwiYWxnIjoiUlMyNTYifQ.eyJpc3MiOiJodHRwczovL2FwcGxlaWQuYXBwbGUuY29tIiwiYXVkIjoiY29tLmludHJvYXBwLnNlcnZpY2UiLCJleHAiOjE2MTUyOTY4NjIsImlhdCI6MTYxNTIxMDQ2Miwic3ViIjoiMDAyMDA5LmQwMDc5NDQzODFiOTQ2NmNhNGVkOWZiZGIyNmZmOWQ3LjE2NTQiLCJjX2hhc2giOiJkMFVOcUN2RGtROVNtUDVDRW93UmdnIiwiZW1haWwiOiJkb25hcmljaDA0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjoidHJ1ZSIsImF1dGhfdGltZSI6MTYxNTIxMDQ2Miwibm9uY2Vfc3VwcG9ydGVkIjp0cnVlfQ.G3gxgk8-Eb5QHg6rrAUUre88SLwhHe6NTelgsDhAuovj76gkZZReIUoU9_7TuGZ0vSVQagucu-RE_P2E4AvISppQA5mH9bvF5qXQcWeiYu_hTPT36bPWv2V6oyyH324HPmhSOaar1VYpKc3ig3Ojf5svNuSsst2BfvandbLHuzPuZTnsc_x3-2nDEiQibLDQh2inta_VLfBBj-5xBUBkoOpzJcMj_ix5K_n371Ke1tULLQ9pinkdcXarQNneZGtUADUJU0BLNdE6sqbHO73b-atCJ06VqTMRoDm_JbziA0smhtsPUPgaUgEGWraHTAVg45CkE6wxGWKmBBmEKuP0kQ'
  res.render('pages/users/loginLoader', {
    path: './login',
    pageTitle: 'Login',
    token: req.body.id_token,
    errorMessage: 'errorMessage',
  });
};

exports.dashboard = async(req, res) => {
  const audioCount = await (await audiobook.find({status: { $eq: 'active' } })).length;
  const ebookCount = await (await ebook.find({status: { $eq: 'active' } })).length;
  const reviewCount = await (await reviews.find({})).length;
  const bannerCount = await (await banner.find({})).length;
  const pageCount = await (await page.find({})).length;
  const categoryCount= await (await category.find({})).length;

  // const copsCount = await (await user.find({ role: { $eq: 'cops' }, status: { $eq: 'active' } })).length;
  res.render('pages/admin/dashboard/dashboard', {
    path: './dashboard',
    pageTitle: 'dashboard',
    audioCount:audioCount,
    ebookCount:ebookCount,
    reviewCount:reviewCount,
    bannerCount:bannerCount,
    pageCount:pageCount,
    categoryCount:categoryCount,
    // copsCount:copsCount,
    errorMessage: 'errorMessage',
  });
};

