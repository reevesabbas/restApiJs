require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

//connect using the database url in the environment file. Passing thru object as second argument bc VSC told me to.
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
//On connection error and open, displaying messages.
const db = mongoose.connection
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));

//When the server get's a req, uses JSON as body inside HTTP methods.
app.use(express.json());

//Creating the route file-path and setting it to a variable
const tierListsRouter = require('./routes/tierLists')
//Inside the /tierList path, use the routes designated in the filepath stored in tierListRouter
app.use('/tierLists', tierListsRouter)

//Allows port to be set thru the environment
let port = process.env.PORT || 3000;
//listen on this ^ port and if heard, log to the console.
app.listen(port, () => console.log(`Server started on port ${port}`));

