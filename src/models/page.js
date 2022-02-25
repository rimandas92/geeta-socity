const mongoose = require('mongoose');
const Schema = mongoose.Schema;
import urlSlug from 'mongoose-slug-generator';

/**
 * page model design.
 * @returns {mongooseModel} it returns the schema model of pages
 */
mongoose.plugin(urlSlug);
const Page = new Schema(
  {
    title: {
      type: String,
      required: [true, 'can\'t be blank'],
    },
    body: {
      type: String,
      required: true,
    },
    slug: { type: String, slug: 'title'}
  },
  { timestamps: true }
);
Page.pre('save', function(next) {
    this.slug = this.title.split(' ').join('-');
    next();
  });
export default mongoose.model('Pages', Page);
