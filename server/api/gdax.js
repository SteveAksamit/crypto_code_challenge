const router = require('express').Router()
const axios = require('axios')
const moment = require('moment')
const Gdax = require('gdax');
const publicClient = new Gdax.PublicClient();

module.exports = router

router.get('/oneHourData', (req, res, next) => {
  let start = moment().subtract(72, 'hours').toISOString()
  let end = moment().toISOString()
  publicClient.getProductHistoricRates('BTC-USD', { granularity: 3600, start: start, end: end })
    .then(data => {
      let subsetArr = data.slice(0, 72)
      let output = subsetArr.map(item => {
        return {
          date: moment.unix(item[0]).format('YYYY-MM-DD hh:mm:A'),
          open: item[3],
          high: item[2],
          low: item[1],
          close: item[4],
          volume: item[5]
         }
      })
      return output.reverse()
    })
    .then(cleansedData => {
      res.json(cleansedData)
    })
    .catch(error => {
      console.error(error)
      res.send('cannot connect to API')
    })
})

router.get('/orderBook', (req, res, next) => {
    let test = Object.keys(orderbookSync).length
    res.send(test)
});
