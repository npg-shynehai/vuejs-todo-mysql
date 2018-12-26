var express = require("express")
const logger = require('morgan');
var bodyParser = require("body-parser")

var index = require("./server/routes/index")
var cors = require("cors")

var port = 3000;


// Set up the express app
var app = express()

app.use(cors())

// Log requests to the console.
app.use(logger('dev'));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

require('./server/routes')(app);
app.use("/",index);
app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to the beginning of nothingness.',
  }));
  app.listen(port,function(){
        console.log('Server started on port '+ port)
    })
module.exports = app 