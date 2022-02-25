import ebook from '../models/ebook';
import review from '../models/reviews';

export const createEbooks = async(newBook) => {
  try {
    const newEbook = new ebook(newBook);
    return await newEbook.save();
  } catch (error) {
    console.log(error);
  }
};
export const editEbook = async(newBook,id) => {
  try {
    const updateBook = {
      title: newBook.body.title,
      shortNote: newBook.body.shortNote,
      chapter: newBook.body.chapter,
    };
    if(newBook.files.filter((file) => file.fieldname === 'image').length >0){
      updateBook.image = `/uploads/ebooks/${
        newBook.files.filter((file) => file.fieldname === 'image')[0].filename
      }`;
      
    }
    if(newBook.files.filter((file) => file.fieldname === 'ebook').length >0){
      updateBook.book_URL= `/uploads/ebooks/${
        newBook.files.filter((file) => file.fieldname === 'ebook')[0].filename
      }`;
    }
    await ebook.findByIdAndUpdate(id,updateBook).lean();
    return ebook.findById(id).lean();
  } catch (error) {
    console.log(error);
  }
};
export const deleteEbook = async(id) => {
  try {
    return await ebook.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
  }
};
export const addReviewBooks = async(newReview) => {
  try {
    const reviews = new review(newReview);
    await reviews.save();
   await ebook.findByIdAndUpdate(newReview.ebookId,{
      $push:{
        reviews:reviews._id
      }
    });
    return reviews;
  } catch (error) {
    console.log(error);
  }
};

export const fetchEbookList = async(newBook) => {
  try {
    return await ebook.find({}).sort({ orderPriority: 1 }).populate('reviews').lean();
  } catch (error) {
    console.log(error);
  }
};

// export const getCategory = async() => {
//   try {
//     return await category.find();
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const updatePriorityController = async(data) => {
//   try {
    
//   } catch (error) {
//     console.log(error);
//   }
// };
