import mongoose from 'mongoose';

const wordSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  word: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  level: {
    type: Number,
    required: true
  }
});

const Word = mongoose.model('Word', wordSchema);

export default Word;
