require('dotenv').config();

const superagent = require('superagent');
const MOVIE_KEY = process.env.MOVIE_KEY;


function movieHandeler(req,res) {

    let {searchQuery} = req.query;
    try{
        const url = `https://api.themoviedb.org/4/search/movie?api_key=${MOVIE_KEY}&query=${searchQuery}`;

        superagent.get(url).then(moviedata  => {
            let josnObject = moviedata.body.results;
            let arrayOfDays = josnObject.map((movie) => new Movie(movie));
            res.send(arrayOfDays); 
        }).catch(err =>{
            console.log('erro -> \n' ,err)
        });
    } catch (error) {
            res.send('erro -> \n' ,err);
    }
}



class Movie  {

    constructor(movie) {
        this.title = movie.title;
        this.overview = movie.overview;
        this.average_votes = movie.title;
        this.total_votes = movie.vote_count;
        this.image_url = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        this.popularity = movie.popularity;
        this.released_on = movie.release_date;
    }   
}

module.exports = movieHandeler;