import Express from 'express';
import Dotenv from 'dotenv';
import Auction from './auction/auction.route.js';
import Mongoose from 'mongoose';
const path = require('path');

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

// Facilitates access to frontend client
app.use(Express.static(path.join(__dirname, "../../frontend/build")))

// Serves React client
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/build", "index.html"));
});

app.listen(port, 'localhost');

console.log(`Server running on ${port}...`);