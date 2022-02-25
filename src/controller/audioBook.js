import audiobook from '../models/audiobook';

export const creatAudioBooks = async (newBook) => {
  try {
    const newEbook = new audiobook(newBook);
    return await newEbook.save();
  } catch (error) {
    console.log(error);
  }
};

export const fetchAudioBookList = async (category) => {
  try {
    return await audiobook.find({ category: category }).sort({ orderPriority: 1 }).lean();
  } catch (error) {
    console.log(error);
  }
};

export const fetchAudioBookAll = async (category) => {
  try {
    return await audiobook.find({}).sort({ orderPriority: 1 }).lean();
  } catch (error) {
    console.log(error);
  }
};

export const deleteAudioBook = async (id) => {
  try {
    return await audiobook.findByIdAndDelete(id).lean();
  } catch (error) {
    console.log(error);
  }
};

export const editAudiobook = async (id, updateAudioBookData) => {
  try {
    if (updateAudioBookData.image) {
      const { title, shortNote, author, image,category } = updateAudioBookData;
      return await audiobook.findByIdAndUpdate(id, {
        title,
        shortNote,
        author,
        image,
        category
      });
    } else {
      const { title, shortNote, author,category } = updateAudioBookData;
      return await audiobook.findByIdAndUpdate(id, {
        title,
        shortNote,
        author,
        category
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchAudioBookListByCategoryId = async (category_id) => {
  try {
    return await audiobook.find({ category: category_id }).sort({ orderPriority: 1 }).lean();
  } catch (error) {
    console.log(error);
  }
};
