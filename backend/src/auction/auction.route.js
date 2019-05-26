import express from 'express';
import auctionController from './auction.controller';
let router = express.Router();

router.get('/test', auctionController.test);
router.get('/:server/:item', auctionController.authenticate, auctionController.getItemPrice);
export default router;