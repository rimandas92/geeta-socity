import Banner from '../models/banner';
import Page from '../models/page';

export const addBanners = async (newBanner) => {
  try {
    const bannerExit = await Banner.find({
        name: newBanner.name,
    });
    console.log(bannerExit.length,newBanner);
    if (bannerExit.length > 0) {
      throw { error: 'Banner already exit' };
    }
    console.log(bannerExit.length,newBanner);
    const banner = new Banner(newBanner);
    return await banner.save();
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
export const getBanner = async () => {
  try {
    const banners = await Banner.find({}).lean();
    return banners;
  } catch (err) {
    throw err;
  }
};
export const deleteBanners = async (id) => {
  try {
    await Banner.findByIdAndDelete(id);
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
