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

router.get('/oneMonthData', (req, res, next) => {
  let start = moment().subtract(720, 'hours').toISOString()
  let end = moment().toISOString()
  publicClient.getProductHistoricRates('BTC-USD', { granularity: 21600, start: start, end: end })
    .then(data => {
      let subsetArr = data.slice(0, 120)
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
      //console.log(cleansedData)
      res.json(cleansedData)
    })
    .catch(error => {
      console.error(error)
      res.send('cannot connect to API')
    })
})

router.get('/threeMonthData', (req, res, next) => {
  let start = moment().subtract(2160, 'hours').toISOString()
  let end = moment().toISOString()
  publicClient.getProductHistoricRates('BTC-USD', { granularity: 86400, start: start, end: end })
    .then(data => {
      let subsetArr = data.slice(0, 90)
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

router.get('/orders', (req, res, next) => {
  publicClient.getProductOrderBook('BTC-USD', { level: 3})
    .then(data => {
      res.json(data)
    })
    .catch(error => {
      console.error(error)
      res.send('cannot connect to API')
    })
})

router.get('/trades', (req, res, next) => {
  publicClient.getProductTrades('BTC-USD')
  .then(data => {
    let output = data.map(item => {
        item.date = moment(item.time).format("YYYY-MM-DD hh:mm:A")
      return item
    })
    return output.reverse()
  })
  .then(cleansedData => {
    //console.log(cleansedData)
    res.json(cleansedData)
  })
    .catch(error => {
      console.error(error)
      res.send('cannot connect to API')
    })
})


//'2018-01-31T21:19:23.341Z'
//YYYY-MM-DD hh:mm:A
