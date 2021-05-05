require('dotenv').config();

const weatherData = require('./data/weather.json');
const superagent = require('superagent');
const WEATHER_KEY = process.env.WEATHER_KEY;


function weatherHandeler(req, res) {

    let {searchQuery,lat,lon} = req.query;

    try{
        const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_KEY}&lat=${lat}&lon=${lon}`;

        superagent.get(url).then(weatherData => {
            const ForecastData = weatherData.body.data.map(day => new Forecast(day));
            res.send(ForecastData);
        }).catch(err =>{
            console.log('erro -> \n' ,err)
        });

    } catch (error) {
    const ForecastData = weatherData.data.map(day =>{
        return (new Forecast (day))});
    res.send(ForecastData);
    }
}



class Forecast  {

    constructor(data) {
        this.description = data.weather.description;
        this.date = data.valid_date;
    }   
}


module.exports = weatherHandeler;
