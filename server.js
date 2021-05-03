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



function Home (req, res) {
    console.log('appp');
    res.send('Hello World')
}


function weather(req, res) {
    console.log('weather');
    let searchQuery = req.query.searchQuery;
    let lat = req.query.lat;
    let lon = req.query.lon;

    const cityWeather = data.find( city =>{
        console.log(city.city_name ,searchQuery );
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