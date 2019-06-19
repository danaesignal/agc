import express from 'express';
import auctionController from './auction.controller';
let router = express.Router();

router.get('/test', auctionController.test);
router.get('/:server', auctionController.authenticate, auctionController.getPrices);
export default router;