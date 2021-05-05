'use strict';

 const Forecast = require('./Forecast.js')

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const data = require('./data/weather.json');


// Use this as a talking point about environment variables
const PORT = process.env.PORT || 3002;
/////////////// App Setup Related /////////////////////
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));
// app.use(express.json({
//     type: ['application/json', 'text/plain']
//     }))



//////////////////////// routes ///////////////////////////////


app.get('/',Home);
app.get('/weather', weather);

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


function weather(req, res) {

    let searchQuery = req.query.searchQuery;
    let lat = req.query.lat;
    let lon = req.query.lon;

    const cityWeather = data.find( city =>{
        return (city.city_name).toLowerCase().includes(searchQuery);
    });

    const ForecastData = cityWeather.data.map(day =>{
        return (new Forecast (day.weather.description , day.datetime))
    })

    res.send(ForecastData);
}




app.listen(PORT, () => {
    console.log(`app is listning on port${PORT}`);
    });