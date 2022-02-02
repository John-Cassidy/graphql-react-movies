import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const movieSchema = new Schema({
  name: String,
  age: Number,
});

export default mongoose.model('Movie', movieSchema);
