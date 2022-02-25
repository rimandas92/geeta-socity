import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

/**
 * Reviews model design.
 * @returns {mongooseModel} it returns the schema model of books
 */
const reviews = new Schema(
  {
    ebookId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Ebook',
      required: [true, 'can\'t be blank'],
    },
    name: {
      type: String,
      required: [true, 'can\'t be blank'],
    },
    designation: {
      type: String,
      required: [true, 'can\'t be blank'],
    },
    reviews: {
      type: String,
      default: null,
    },
    description:{
        type: String,
        required: [true, 'can\'t be blank'],
    }
  },

  { timestamps: true }
);

export default mongoose.model('reviews', reviews);
