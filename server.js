'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();



// Use this as a talking point about environment variables
const PORT = process.env.PORT || 3002;




/////////////// App Setup Related /////////////////////
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));
// app.use(express.json({
//     type: ['application/json', 'text/plain']
//     }))


///////////////////////our moduels
const weatherHandeler = require('./weather.js');
const movieHandeler = require('./movie.js');
const trailsHandeler = require('./trails.js');
const yelpHandeler = require('./yelp.js');


//////////////////////// routes ///////////////////////////////


app.get('/',Home);
app.get('/weather', weatherHandeler);
app.get('/movies', movieHandeler);
app.get('/trails', trailsHandeler);
app.get('/yelp', yelpHandeler);

// Thats catch all the Wrong Routes Path Errors 
// - > https://levelup.gitconnected.com/how-to-handle-errors-in-an-express-and-node-js-app-cb4fe2907ed9
app.use((req, res, next) => {
    const error = new Error(`Not found`);
    error.status = 404;
    next(error);
   });

   // Thats catch all Errors in Router Block
   // error handler middleware
app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
     error: {
     status: error.status || 500,
     message: error.message || `Internal Server Error`,
    },
   });
  });



function Home (req, res) {
    res.send('Hello World')
}







app.listen(PORT, () => {
    console.log(`app is listning on port${PORT}`);
    });