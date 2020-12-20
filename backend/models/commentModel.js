const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    text: { type: String, required: true },
    user: {
      id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      email: { type: String },
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Posts',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Comment', commentSchema);
