import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let auctionSchema = new Schema({
  server: {type: String, required: true},
  item: {type: Number, required: true},
  buyout: {type: Number, required: true}
});

export default mongoose.model('Auction', auctionSchema);