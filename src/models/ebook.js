import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

/**
 * Books model design.
 * @returns {mongooseModel} it returns the schema model of books
 */
const ebook = new Schema(
  {
    title: {
      type: String,
      required: [true, 'can\'t be blank'],
    },
    shortNote: {
      type: String,
      required: [true, 'can\'t be blank'],
    },
    image: {
      type: String,
      required: [true, 'can\'t be blank'],
    },
    originalpdflink: {
      type: String
    },
    startpage: {
      type: String
    },
    chapterList: [
      {
        chapter: String,
        pages: {
          number: [],
          pdflink: String
        },
      },
    ],
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    synopsis: {
      type: String,
      required: [true, 'can\'t be blank'],
    },
    author: {
      type: String,
      required: [true, 'can\'t be blank'],
    },
    orderPriority:{
      type: Number
    },
    reviews: [{ type: mongoose.Schema.ObjectId, ref: 'reviews' }],
  },

  { timestamps: true }
);

export default mongoose.model('Ebook', ebook);
