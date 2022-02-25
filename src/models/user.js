import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

/**
 * User model design.
 * @returns {mongooseModel} it returns the schema model of user
 */
const user = new Schema(
  {
    email: {
      type: String,
      required: [true, 'can\'t be blank'],
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    hash: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },

  { timestamps: true },
);

user.index(
  {
    email: 1,
  },
  {
    unique: true,
  }
);
user.index({location: '2dsphere'});

export default mongoose.model('User', user);
