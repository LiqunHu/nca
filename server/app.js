const log4js = require('log4js')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const fs = require('fs')

const config = require('./config')

let app = express()
let cors = require('cors')
let ejs = require('ejs')

let FileSRV = require('./util/FileSRV')
let services = require('./service')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.engine('.html', ejs.__express)
app.set('view engine', 'html')

app.use(cors())

app.use(express.static(path.join(__dirname, 'public')))
app.use('/temp', express.static(path.join(__dirname, '../public/temp')))
if (config.mongoFlag == false) {
  app.use('/files', express.static(path.join(__dirname, 'public/files')))
}
app.use(
  log4js.connectLogger(log4js.getLogger('http'), {
    level: 'auto',
    nolog: '\\.gif|\\.jpg$'
  })
)
app.use(
  bodyParser.json({
    limit: '50mb'
  })
)
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
app.use(
  bodyParser.text({
    type: 'text/*'
  })
)
app.use(bodyParser.raw())
app.use(cookieParser())
// app.use('/api', authority.AuthMiddleware);

//处理webpack服务请求
app.get('/__webpack_hmr', function(req, res) {
  res.send('')
})

app.get('/', (req, res) => {
  res.redirect('index.html')
})

app.get('/files/:filetag', FileSRV.FileResource)

//openApi
app.post('/api/openapi/kujiale', services.KujialeSRV.KujialeControlResource)
app.get('/api/openapi/kujiale', services.KujialeSRV.KujialeGetControlResource)

app.post(
  '/api/integration/IntegrationControl',
  services.IntegrationSRV.IntegrationResource
)

//site
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

if (app.get('env') === 'test') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.send({
      message: err.message,
      error: err
    })
  })
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  res.send({
    message: err.message,
    error: {}
  })
})

module.exports = app
