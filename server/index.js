const express  = require('express');
const mongoose  = require('mongoose');
const path = require('path');
const config = require('config');
var cors = require('cors');

const users = require('./routes/api/users');

const app = express().use("*", cors());

//Express middleware
app.use(express.json());

//DB config
const db = config.get('mongoURI');

//Connect to mongo
mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connection stablished...'))
  .catch(err => console.log(err));

//Use routes
app.use(express.static(path.join(__dirname, '../build')));

app.get('/', function(req,res){
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.use('/user', users);

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server started on port ${port}`));
