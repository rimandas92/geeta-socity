const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Banner model design.
 * @returns {mongooseModel} it returns the schema model of pages
 */
const Banner = new Schema(
  {
    name: {
      type: String,
      required: [true, 'can\'t be blank'],
    },
    image: {
        type: String,
        required: [true, 'can\'t be blank'],
      },
  },
  { timestamps: true }
);
export default mongoose.model('Banner', Banner);
