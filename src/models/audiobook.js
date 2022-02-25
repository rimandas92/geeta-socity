import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

/**
 * Books model design.
 * @returns {mongooseModel} it returns the schema model of books
 */
const audioBook = new Schema(
  {

    title: {
      type: String,
      required: [true, 'can\'t be blank'],
    },
    category: {
      type: String,
      ref: 'Category'
    },
    shortNote: {
      type: String,
      required: [true, 'can\'t be blank'],
    },
    image: {
      type: String,
      required: [true, 'can\'t be blank'],
    },
    track: {
      type: Array,
    },
    author:{
      type:String,
      required: [true, 'can\'t be blank'],
    },
    orderPriority:{
      type: Number
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },

  { timestamps: true },
);

export default mongoose.model('audioBook', audioBook);
