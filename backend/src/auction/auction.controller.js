import Dotenv from 'dotenv';
import Fetch from 'node-fetch';
import Auction from './auction.model';
import FreshnessDate from '../freshnessDate/freshnessDate.model';

Dotenv.config()

const Blizzard = require('blizzard.js').initialize({
  key: process.env.BLIZZARD_KEY,
  secret: process.env.BLIZZARD_SECRET
});

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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
  let lowestListing = {};
  const relevantItemIds = [
    124106,
    151565,
    129034,
    153636,
    153635,
    158188,
    158187,
    153669,
    158189,
    153647,
    141446,
    165692,
    165733,
    153662,
    153661,
    153663,
    165016,
    153665,
    153666,
    153664,
    165017,
    153668,
    153667,
    164682,
    158202,
    158201,
    158204,
    152505,
    152511,
    152506,
    152507,
    152508,
    152509,
    152510
  ]

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

      await apiAuctionData.forEach(listing => {
        if(relevantItemIds.includes(listing.item)){
          let auction = new Auction(
            {
              server: req.params.server,
              item: listing.item,
              // We want the price *per item*, so we divide buyout by quantity.
              buyout: listing.buyout/listing.quantity,
            }
          );
          if (lowestListing[listing.item] === undefined || lowestListing[listing.item].buyout > auction.buyout){
            lowestListing[listing.item] = auction;
          }
        }
      })
      await Promise.all(
        Object.keys(lowestListing).map(listing => {
          lowestListing[listing].save(function(err) {
            if (err) return next(err);
          })
        })
      )
    }

    // Wait a moment for data propagation, because we can't seem to stop pulling
    // in empty records unless we do..
    await sleep(750)

    // If we just persisted data to the DB, we'll send that local copy instead of
    // hitting the server again
    if(lowestListing[req.params.item] !== undefined){
      let response = {
        _id: lowestListing[req.params.item]["_id"],
        item: lowestListing[req.params.item].item,
        buyout: lowestListing[req.params.item].buyout,
      };
      res.send(response);
    } else {
      // Otherwise, we find the lowest price for the item in question, on
      // the server in question...
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
          if(err) next(err);
          // .. and serve the document.
          res.send(result[0]);
        }
      );
    }

  }
  catch(error){
    console.log(error)
    return res.send("An error has occurred.");
  }
};

export default AuctionController;