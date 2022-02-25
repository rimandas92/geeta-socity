const { default: Page } = require('../../src/models/page');

exports.index = async(req, res) => {
    let perPage = 5;
    let page = req.query.page || 1;
   const pages = await Page
      .find()
      .skip(perPage * page - perPage)
      .limit(perPage);
      const userCount  = await Page.count();
    res.render('pages/admin/manage/pages', {
      pageTitle: 'manage pages',
      users: pages,
      clear:false,
      current: page,
      pages: Math.ceil(userCount / perPage)
    });
  };
exports.create = async(req, res) => {
    let perPage = 5;
    let page = req.query.page || 1;
   const pages = await Page
      .find()
      .skip(perPage * page - perPage)
      .limit(perPage);
      const userCount  = await Page.count();
    res.render('pages/admin/manage/createPage', {
      pageTitle: 'manage pages',
      users: pages,
      clear:false,
      current: page,
      pages: Math.ceil(userCount / perPage)
    });
  };
exports.edit = async(req, res) => {
    const id = req.params.id;
   const pages = await Page
      .findById(id);
      console.log(pages);
    res.render('pages/admin/manage/editPage', {
      pageTitle: 'manage pages',
      pages: pages, 
      id:id
    });
  };