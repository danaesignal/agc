import Dotenv from "dotenv";
import Auction from "./auction.model";

const Axios = require("axios").default;
const ClientOAuth2 = require("client-oauth2");

Dotenv.config();

const KEY = process.env.BLIZZARD_KEY;
const SECRET = process.env.BLIZZARD_SECRET;

const AuctionController = {};

// Test command
AuctionController.test = async (req, res) => {
    return res.send("AuctionController");
};

// Retrieves the lowest price at which a given item is available for sale on
// the specified World of Warcraft server

AuctionController.getPrices = async (req, res, next) => {
    let apiAuctionData;
    let dbAuctionData;
    let lowestListing = {};
    const blizzAuth = new ClientOAuth2({
        clientId: KEY,
        clientSecret: SECRET,
        accessTokenUri: "https://us.battle.net/oauth/token",
    });

    const token = await (await blizzAuth.credentials.getToken()).data
        .access_token;
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
        152510,
    ];
    try {
        // Retrieves the freshness date for Blizzard's auction data and our stored auction data (if any)
        dbAuctionData = await Auction.find(
            { server: req.params.server },
            (err) => {
                if (err) {
                    return next(err);
                }
            }
        );

        dbAuctionData = dbAuctionData[0];
        // 4 hours = 14400000 miliseconds
        // If the auction data is four hours old, or doesn't exist, refresh the data...
        if (
            dbAuctionData === undefined ||
            Date.now() - dbAuctionData.freshness >= 14400000
        ) {
            const server = req.params.server;

            Axios.get(
                `https://us.api.blizzard.com/data/wow/realm/${server}?namespace=dynamic-us&locale=en_US&access_token=${token}`
            ).then((realmResponse) => {
                Axios.get(
                    `${realmResponse.data.connected_realm.href}&access_token=${token}`
                ).then((connectedRealmResponse) => {
                    let connectedRealmId = connectedRealmResponse.data.id;
                    Axios.get(
                        `https://us.api.blizzard.com/data/wow/connected-realm/${connectedRealmId}/auctions?namespace=dynamic-us&locale=en_US&access_token=${token}`
                    ).then((auctionResponse) => {
                        apiAuctionData = auctionResponse.data.auctions;
                        apiAuctionData.forEach((listing) => {
                            if (relevantItemIds.includes(listing.item.id)) {
                                // We want the price per item, so we divide unit_price by quantity listed
                                let auction = listing.unit_price;
                                if (
                                    lowestListing[listing.item.id] ===
                                        undefined ||
                                    lowestListing[listing.item.id] > auction
                                ) {
                                    lowestListing[listing.item.id] = auction;
                                }
                            }
                        });

                        // If there's no data for a given item, assign it a price of 0 (it cannot be bought for any price)
                        relevantItemIds.forEach((id) =>
                            lowestListing[id] === undefined
                                ? (lowestListing[id] = 0)
                                : null
                        );
                        Auction.findOneAndUpdate(
                            {
                                server: `${req.params.server}`,
                            },
                            {
                                server: `${req.params.server}`,
                                items: JSON.stringify(lowestListing),
                                freshness: Date.now(),
                            },
                            {
                                upsert: true,
                                new: true,
                            },
                            function (err) {
                                if (err) return next(err);
                            }
                        ).then((updateResponse) => {
                            res.send(updateResponse);
                        });
                    });
                });
            });
        } else {
            res.send(dbAuctionData);
        }
    } catch (error) {
        console.log(error);
        return res.send("An error has occurred.");
    }
};

export default AuctionController;
