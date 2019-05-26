import Express from 'express';
import Dotenv from 'dotenv';
import Auction from './auction/auction.route.js';
import Mongoose from 'mongoose';
// --Imports for NYI features--
// import Path from 'path';

Dotenv.config();

const port = process.env.PORT || 4500;
const app = Express();

let mongoDB = process.env.DATABASE_URL;
Mongoose.connect(mongoDB);
Mongoose.Promise = global.Promise;
let db = Mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(Express.json());
app.use(Express.urlencoded({extended: false}));

// Router for AH pricing data
app.use('/auction', Auction);

// REACT CLIENT STUFF GOES HERE
// REACT CLIENT STUFF GOES HERE
// REACT CLIENT STUFF GOES HERE
// REACT CLIENT STUFF GOES HERE

app.listen(port);

console.log(`Server running on ${port}...`);