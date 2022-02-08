const express = require('express')
const bodyParser = require('body-parser')
const loginRouth = require('./routes/auths/auths')
const mongoose = require('mongoose');
const app = express()
app.use(cors());

app.use(bodyParser.urlencoded({extended: true}))

app.use('/shop',loginRouth)


mongoose
  .connect('mongodb://localhost:27017/theProject', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    app.listen(3005);
    console.log('Connected');
  })
  .catch(err => console.log(err));
