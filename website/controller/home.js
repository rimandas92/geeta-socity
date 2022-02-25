// const { default: Page } = require('../../src/models/page');
const { default: audiobook } = require("../../src/models/audiobook");
const { default: banner } = require("../../src/models/banner");
const { default: ebook } = require("../../src/models/ebook");
const { default: user } = require("../../src/models/user");
const { default: category } = require("../../src/models/category");
// const { default: model } = require('../../src/models/model');
// const { default: make } = require('../../src/models/make');

exports.index = (req, res) => {
  res.render("index", {
    path: "./",
    pageTitle: "Home",
    errorMessage: "errorMessage",
  });
};
// exports.about = async(req, res) => {
//   const pages = await Page.find({
//     title:'about'
//   });
//   if(pages.length ===0){
//     pages.body = '<h3>Edit about in admin page=> title About</h3>';
//   }else{
//     pages.body = pages[0].body;
//   }
//   res.render('about', {
//     path: './about',
//     pageTitle: 'about',
//     data:pages,
//     errorMessage: 'errorMessage',
//   });
// };
// exports.privacy = async(req, res) => {
//   const pages = await Page.find({
//     title:'privacy'
//   });
//   if(pages.length ===0){
//     pages.body = '<h3>Edit privacy in admin page=> title Privacy</h3>';
//   }else{
//     pages.body = pages[0].body;
//   }
//   res.render('privacyPolicy', {
//     path: './about',
//     pageTitle: 'about',
//     data:pages,
//     errorMessage: 'errorMessage',
//   });
// };
// exports.terms = async(req, res) => {
//   const pages = await Page.find({
//     title:'terms'
//   });
//   if(pages.length ===0){
//     pages.body = '<h3>Edit Terms & Conditions in admin page=> title terms</h3>';
//   }else{
//     pages.body = pages[0].body;
//   }
//   res.render('terms', {
//     path: './about',
//     pageTitle: 'about',
//     data:pages,
//     errorMessage: 'errorMessage',
//   });
// };
// exports.faq = async(req, res) => {
//   const pages = await Page.find({
//     title:'faq'
//   });
//   if(pages.length ===0){
//     pages.body = '<h3>Edit FAQ in admin page=> title faq</h3>';
//   }else{
//     pages.body = pages[0].body;
//   }
//   res.render('faq', {
//     path: './about',
//     pageTitle: 'about',
//     data:pages,
//     errorMessage: 'errorMessage',
//   });
// };
// exports.howitsworks = async(req, res) => {
//   const pages = await Page.find({
//     title:'howitsworks'
//   });
//   if(pages.length ===0){
//     pages.body = '<h3>Edit How its works in admin page=> title howitsworks</h3>';
//   }else{
//     pages.body = pages[0].body;
//   }
//   res.render('howitswork', {
//     path: './about',
//     pageTitle: 'about',
//     data:pages,
//     errorMessage: 'errorMessage',
//   });
// };
exports.allUsers = async (req, res) => {
  if (req.query.keyword) {
    let perPage = 5;
    let page = req.params.page || 1;
    const users = await user
      .find({
        role: { $ne: "admin" },
        status: { $eq: "active" },
        $or: [
          { email: { $in: req.query.keyword } },
          { firstName: { $in: req.query.keyword } },
          { lastName: { $in: req.query.keyword } },
          // etc. add your other fields as well here
        ],
      })
      .skip(perPage * page - perPage)
      .limit(perPage);
    const userCount = await user.count();
    return res.render("pages/admin/manage/user", {
      pageTitle: "manage users",
      users: users,
      current: page,
      clear: true,
      pages: Math.ceil(userCount / perPage),
    });
  }
  let perPage = 5;
  let page = req.query.page || 1;
  const users = await user
    .find({ role: { $eq: "user" }, status: { $eq: "active" } })
    .sort({ $natural: -1 })
    .skip(perPage * page - perPage)
    .limit(perPage);
  const userCount = await (
    await user.find({ role: { $eq: "user" }, status: { $eq: "active" } })
  ).length;
  res.render("pages/admin/manage/user", {
    pageTitle: "manage users",
    users: users,
    clear: false,
    current: page,
    pages: Math.ceil(userCount / perPage),
  });
};
exports.create = (req, res) => {
  res.render("pages/admin/manage/createEbook", {
    pageTitle: "Create ebook",
  });
};
exports.editEbook = (req, res) => {
  const id = req.params.id;
  res.render("pages/admin/manage/editEbook", {
    pageTitle: "Create ebook",
    id: id,
  });
};
exports.ebook = async (req, res) => {
  console.log("Searcu", req.query);
  if (req.query.keyword) {
    const ebookData = await ebook.find({
      $or: [
        { title: { $regex: "^" + req.query.keyword, $options: "i" } },
        { author: { $regex: "^" + req.query.keyword, $options: "i" } },
        // etc. add your other fields as well here
      ],
    });
    const ebookCount = await (await ebook.find()).length;
    console.log(ebookData);
    return res.render("pages/admin/manage/ebook", {
      pageTitle: "manage ebook",
      users: ebookData,
      clear: true,
      current: page,
      pages: Math.ceil(ebookCount / perPage),
    });
  }
  let perPage = 5;
  let page = req.query.page || 1;
  const ebookData = await ebook
    .find({})
    .sort({ orderPriority: 1 })
    .skip(perPage * page - perPage)
    .limit(perPage);
  // const ebook = await make
  // .find({}).select('_id name').lean();
  const ebookCount = await (await ebook.find()).length;
  console.log(ebookData);
  res.render("pages/admin/manage/ebook", {
    pageTitle: "manage ebook",
    users: ebookData,
    clear: false,
    current: page,
    pages: Math.ceil(ebookCount / perPage),
  });
};

// exports.make = async (req, res) => {
//   if (req.query.keyword) {
//     let perPage = 5;
//     let page = req.params.page || 1;
//     const modelData = await make
//       .find({})
//       .skip(perPage * page - perPage)
//       .limit(perPage);
//     const userCount = await user.count();
//     return res.render('pages/admin/manage/make', {
//       pageTitle: 'manage users',
//       users: modelData,
//       current: page,
//       clear: true,
//       pages: Math.ceil(userCount / perPage),
//     });
//   }
//   let perPage = 5;
//   let page = req.query.page || 1;
//   const makeData = await make
//     .find({})
//     .sort({ $natural: -1 })
//     .skip(perPage * page - perPage)
//     .limit(perPage);
//   const makeCount = await (
//     await make.find()
//   ).length;
//   res.render('pages/admin/manage/make', {
//     pageTitle: 'manage make',
//     users: makeData,
//     clear: false,
//     current: page,
//     pages: Math.ceil(makeCount / perPage),
//   });
// };
exports.allAudio = async (req, res) => {
  let perPage = 5;
  let page = req.query.page || 1;
  const users = await audiobook
    .find({})
    .populate('category')
    .sort({ orderPriority: 1 })
    .skip(perPage * page - perPage)
    .limit(perPage);
  const userCount = await (await audiobook.find({})).length;
  let audioCategory = await category.find({isActive:"true"}).exec();
  console.log("users =====> ",users);
  res.render("pages/admin/manage/audio", {
    pageTitle: "manage cops",
    users: users,
    clear: false,
    categories:audioCategory,
    current: page,
    pages: Math.ceil(userCount / perPage),
  });
};
exports.allBanner = async (req, res) => {
  let perPage = 5;
  let page = req.query.page || 1;
  if (req.query.keyword) {
    const bannerData = await banner.find({
      $or: [
        { name: { $in: req.query.keyword } },
        // etc. add your other fields as well here
      ],
    });
    const bannerCount = await (await banner.find()).length;
    console.log(bannerCount);
    return res.render("pages/admin/manage/banner", {
      pageTitle: "manage ebook",
      users: bannerData,
      clear: true,
      current: page,
      imageUrl: process.env.IMAGE_URL,
      pages: Math.ceil(bannerCount / perPage),
    });
  }

  const users = await banner
    .find({})
    .sort({ $natural: -1 })
    .skip(perPage * page - perPage)
    .limit(perPage);
  const userCount = await (await banner.find({})).length;
  res.render("pages/admin/manage/banner", {
    pageTitle: "manage cops",
    users: users,
    clear: false,
    current: page,
    imageUrl: process.env.IMAGE_URL,
    pages: Math.ceil(userCount / perPage),
  });
};
exports.searchAudioBook = async (req, res) => {
  let perPage = 5;
  let page = req.params.page || 1;
  const users = await audiobook
    .find({
      $or: [
        { title: { $in: req.query.keyword } },
        { author: { $in: req.query.keyword } },
        // etc. add your other fields as well here
      ],
    })
    .skip(perPage * page - perPage)
    .limit(perPage);
  const userCount = await audiobook.count();
  res.render("pages/admin/manage/audio", {
    pageTitle: "manage users",
    users: users,
    current: page,
    clear: true,
    pages: Math.ceil(userCount / perPage),
  });
};

exports.ratingAndReview = async (req, res) => {
  if (req.params.bookId) {
    let perPage = 5;
    let page = req.params.page || 1;
    const users = await ebook.find({}).populate("reviews").lean();
    const selectedEbook = await ebook
      .find({ _id: req.params.bookId })
      .populate("reviews")
      .lean();
    console.log(users);
    const userCount = await ebook.count();
    return res.render("pages/admin/manage/review", {
      pageTitle: "manage users",
      users: users,
      addReview:true,
      selectedEbook: selectedEbook,
      selectId: req.params.bookId,
      current: page,
      clear: true,
      pages: Math.ceil(userCount / perPage),
    });
  }
  let perPage = 5;
  let page = req.params.page || 1;
  const users = await ebook.find({}).populate("reviews").lean();
  console.log(users);
  const userCount = await ebook.count();
  res.render("pages/admin/manage/review", {
    pageTitle: "manage users",
    users: users,
    current: page,
    selectId:null,
    selectedEbook:null,
    addReview:false,
    clear: true,
    pages: Math.ceil(userCount / perPage),
  });
};

exports.category = async (req, res) => {
  res.render("pages/admin/manage/category", {
    pageTitle: "Category",
  });
}

exports.getCategoryList = async(req, res) => {
  await category.find().sort({_id: -1}).exec((err, result) =>{
    if(err){
      return res.send({
        status: false,
        result : err
      })
    }else{
      return res.send({
        status: true,
        result : result
      })
    }
  });
}
