const router = require('express').Router()
const Gdax = require('gdax');
const orderbookSync = new Gdax.OrderbookSync(['BTC-USD']);

module.exports = router


router.get('/bids', (req, res, next) => {
    let bidTotal = 0
    let bids = orderbookSync.books['BTC-USD'].state().bids.slice(0,50).map(item=>{
        item.value = item.price * item.size
        bidTotal += item.value
        item.total = bidTotal
        return item
    })
    res.json(bids)
});

router.get('/asks', (req, res, next) => {
    let askTotal = 0
    let asks = orderbookSync.books['BTC-USD'].state().asks.slice(0,50).map(item=> {
        item.value = item.price * item.size
        askTotal += item.value
        item.total = askTotal
        return item
    })
    res.json(asks)
});
