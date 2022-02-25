import Page from '../models/page';

export const addPage = async (newUser) => {
  try {
    const pageExit = await Page.find({
      title: newUser.title,
    });
    console.log(pageExit);
    if (pageExit.length > 0) {
      throw { error: 'Page already exit' };
    }
    const page = new Page(newUser);
    const pagesave = await page.save();
    return pagesave;
  } catch (err) {
    throw err;
  }
};
export const editPage = async (id, updatePage) => {
  try {
    const pageExit = await Page.findById(id).lean();
    if (!pageExit) {
      throw 'Page does\'t exit';
    }
    await Page.findByIdAndUpdate(id, updatePage);
    const page = await Page.findById(id);
    return page;
  } catch (err) {
    throw err;
  }
};
export const getPage = async () => {
  try {
    const page = await Page.find({}).lean();
    return page;
  } catch (err) {
    throw err;
  }
};
export const deletePages = async (id) => {
  console.log(id);
  try {
    await Page.findByIdAndDelete(id);
    return 'Page deleted successfully';
  } catch (err) {
    throw err;
  }
};
export const nameByPage = async (name) => {
  try {
    return await Page.find({
      slug: name,
    });
  } catch (err) {
    throw err;
  }
};
