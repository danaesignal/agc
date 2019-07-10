import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let auctionSchema = new Schema({
  server: {type: String, required: true},
  items: {type: String, required: true}
});

export default mongoose.model('Auction', auctionSchema);