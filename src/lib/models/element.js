import mongoose from 'mongoose';

const elementSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['div', 'section', 'button', 'input', 'p', 'h1', 'h2', 'h3', 'img', 'a'] // Add more as needed
  },
  name: {
    type: String,
    required: true
  },
  content: String,
  attributes: {
    type: Map,
    of: String
  },
  styles: {
    type: Map,
    of: String
  },
  children: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Element'
  }],
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Element'
  },
  order: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

// Add a pre-save hook to update the 'updatedAt' field
elementSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Element = mongoose.model('Element', elementSchema);

export default Element;