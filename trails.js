require('dotenv').config();

const superagent = require('superagent');
const TRILSKEY = process.env.TRILSKEY;


function trailsHandeler(req,res) {

    let {lat,lon} = req.query;
    try{
        const url = `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lon}&maxDistance=150&key=${TRILSKEY}`;

        superagent.get(url).then(trailsdata  => {
                let arrayOftrail = trailsdata.body.trails.map((trail) => new Trail(trail));
            res.send(arrayOftrail);

        }).catch((erro) => {
            res.status(500).json({
                status: 500,
                responseText: 'Sorry, something went wrong in Trails',
            });
        });

    } catch (error) {
            res.send('erro -> \n' ,err);
    }
}



class Trail  {

    constructor(trail) {
        this.name = trail.name;
        this.location = trail.location;
        this.length = trail.length;
        this.stars = trail.stars;
        this.star_votes = trail.starVotes;
        this.summary = trail.summary;
        this.trails_url = trail.url;
        this.conditions = trail.conditionStatus;
        this.condition_date = trail.conditionDate.slice(0, trail.conditionDate.indexOf(' '));
        this.condition_time = trail.conditionDate.slice(trail.conditionDate.indexOf(' ') + 1);
    }   
}

module.exports = trailsHandeler;