import Dotenv from 'dotenv';
import Fetch from 'node-fetch';
import Auction from './auction.model';
import FreshnessDate from '../freshnessDate/freshnessDate.model';

Dotenv.config()

const Blizzard = require('blizzard.js').initialize({
  key: process.env.BLIZZARD_KEY,
  secret: process.env.BLIZZARD_SECRET
});

let AuctionController = {}

// Generates an oAuth token for Blizzard's API
AuctionController.authenticate = async (req, res, next) => {
  try{
    const applicationToken = await Blizzard.getApplicationToken();
    Blizzard.defaults.token = await applicationToken.data.access_token;
    next();
  }
  catch(error){
    console.log(error);
    return res.send("An error has occurred.");
  }
}

// Test command
AuctionController.test = (req, res) => {
  return res.send('AuctionController');
};

// Retrieves the lowest price at which a given item is available for sale on
// the specified World of Warcraft server

AuctionController.getItemPrice = async (req, res, next) => {
  let apiResponse;
  let auctionAPIURI;
  let rawAPIAuctionData;
  let jsonAPIAuctionData;
  let apiAuctionData;
  let apiFreshness;
  let dbFreshness;

  try{
    // Retrieves the freshness date for Blizzard's auction data and our stored auction data (if any)
    apiResponse = await Blizzard.wow.auction({ origin: 'us', realm: `${req.params.server}`, locale: 'en_US' });
    apiFreshness = await apiResponse.data.files[0].lastModified;
    dbFreshness = await FreshnessDate.find({server: req.params.server}, (err) => {
      if (err) return next(err);
    });

    // If the API data is fresher than our data, or if our data doesn't exist, refresh the data...
    if(dbFreshness.length === 0 || dbFreshness[0].freshness !== apiFreshness){
      // ... by updating our freshness document ...
      FreshnessDate.update(
        {server: `${req.params.server}`},
        {
          server: `${req.params.server}`,
          freshness: apiFreshness
        },
        {upsert: true},
        function(err){
          if (err) return next(err);
        }
      );

      auctionAPIURI = await apiResponse.data.files[0].url;
      rawAPIAuctionData = await Fetch(auctionAPIURI);
      jsonAPIAuctionData = await rawAPIAuctionData.json();
      apiAuctionData = await jsonAPIAuctionData.auctions;

      // ... removing the old auction documents for the server in question ...
      Auction.deleteMany({ server: req.params.server}, function(err){
        if (err) return next(err);
      })

      // ... and replacing them with the new auction documents.
      apiAuctionData.forEach(listing => {
        let auction = new Auction(
          {
            server: req.params.server,
            item: listing.item,
            // We want the price *per item*, so we divide buyout by quantity.
            buyout: listing.buyout/listing.quantity,
          }
        );
        auction.save(function(err) {
          if (err) return next(err);
        })
      });
    }

    // Find the lowest price for the item in question, on the server in question...
    Auction.find(
      {
        server: req.params.server,
        item: req.params.item
      },
      ['item', 'buyout'],
      {
        sort: {
          buyout: 1
        }
      },
      function(err, result){
        // ... And serve that document back to the client.
        if(err) next(err);
        res.send(result[0]);
      }
    );
  }
  catch(error){
    console.log(error)
    return res.send("An error has occurred.");
  }
};

export default AuctionController;