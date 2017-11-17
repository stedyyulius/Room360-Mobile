require('dotenv').config()
const request = require("request")

const getToken = () => {
  let auth = 'Basic '+ new Buffer(`${process.env.BLINKE_KEY}:${process.env.BLINKE_SECRET}`).toString('base64')
  let token = {
    method: 'POST',
    url: 'https://blinke-stage.apigee.net/oauth/token',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'postman-token': 'f70909d8-7893-96c5-6dd6-db2f2cad27c4',
      'cache-control': 'no-cache',
      Authorization: auth
    },
    form: { grant_type: 'client_credentials' }
  }

  return new Promise((resolve,reject) => {
    try {
      request(token, function (error, response, body) {
        if (error) reject(error)
        body = JSON.parse(body)
        resolve(`${body.token_type} ${body.access_token}`)
      })
    } catch(ex) {reject(ex)}
  })
}

const getLocation = async(req,res) => {
  let token = await getToken()

  let lat = req.query.lat
  let lng = req.query.lng
  let location = {
    method: 'GET',
    url: 'https://blinke-stage.apigee.net/io/location',
    qs: { latlng: `${lat},${lng}` },
    headers: {
      'postman-token': '82770455-3324-1400-347f-8e3ab92caa50',
      'cache-control': 'no-cache',
      'content-type': 'application/json',
      authorization: token
    }
  }

  request(options, function (error, response, body) {
    res.send(error ? error: body)
  })
}

const getLatLng = async(req, res) => {
  let token = await getToken()

  let msisdn = req.query.msisdn
  let latlng = {
    method: 'GET',
    url: `https://blinke-stage.apigee.net/io/users/${msisdn}/location`,
    headers: {
      'postman-token': 'b3ac695d-591e-10ec-da3e-955934274b68',
      'cache-control': 'no-cache',
      'content-type': 'application/json',
      authorization: token
    },
    json: true
  }

  request(options, function (error, response, body) {
    res.send(error ? error: body)
  })
}

const sendMessage = async(req, res) => {
  let token = await getToken()

  let msisdn = req.query.msisdn
  let content = req.query.content
  let message = {
    method: 'POST',
    url: 'https://blinke-stage.apigee.net/imx/sms',
    headers: {
      'postman-token': 'f67057e6-4094-cc74-01e0-f0eb5faa1a29',
      'cache-control': 'no-cache',
      'content-type': 'application/json',
      authorization: token
    },
    body: {
      "msisdn": msisdn,
      "message": content
    },
    json: true
  }

  request(message, function (error, response, body) {
    if (error) throw new Error(error)
    if (body.success == false) console.log(body.error)
    else console.log('success')
  })
}

const pushUssd = async(msisdn, content) => {
  let token = await getToken()
  let ussd = {
    method: 'POST',
    url: 'https://blinke-stage.apigee.net/umb/ussd',
    headers: {
      'postman-token': 'a133c1c8-fe32-c50b-1788-679c5c31e2a5',
      'cache-control': 'no-cache',
      'content-type': 'application/json',
      Authorization: token
    },
    body: {
      msisdn: msisdn,
      message: content
    },
    json: true
  }

  request(ussd, function (error, response, body) {
    if (error) throw new Error(error)
    if (body.success == false) console.log(body.error)
    else console.log('success')
  })

}

const init = () => {
  getLatLng(6288133727)
  getLocation(-6.2220818,106.7526381)
  sendMessage("6285813372797", 'Your city is under attack!!!')
  pushUssd("6285813372797", 'I will find you and kill you :)')
}

module.exports = {
  getLatLng,
  getLocation,
  sendMessage,
  pushUssd
}

// init()