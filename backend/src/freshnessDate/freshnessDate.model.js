import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let freshnessDateSchema = new Schema({
  server: {type: String, required: true, max:100},
  freshness: {type: Number, required: true, max:999999999999999},
});

export default mongoose.model('FreshnessDate', freshnessDateSchema);