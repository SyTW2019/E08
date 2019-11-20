const express  = require('express');
const mongoose  = require('mongoose');
const bodyParser  = require('body-parser');

const users = require('./routes/api/users');

const app = express();

//Bodyparser middleware
app.use(bodyParser.json());

//DB config
const db = require('./config/keys').mongoURI;

//Connect to mongo
mongoose.connect(db)
  .then(() => console.log('MongoDB connection stablished...'))
  .catch(err => console.log(err));

//Use routes
app.use('/api/users', users);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));
