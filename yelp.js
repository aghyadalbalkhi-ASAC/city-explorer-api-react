require('dotenv').config();

const superagent = require('superagent');
const YELP_API_KEY = process.env.YELP_API_KEY;


function yelpHandeler(req,res) {
    
    
    try{
    let page = req.query.page;
    let cityname = req.query.cityname;
    let pagNum = 5;
    let beginnigPage = (page-1)*pagNum;
    const HeaderParameter = {
      terms: 'food',
      limit : 5,
      location: cityname,
       offset : beginnigPage,
    };

        const url = `https://api.yelp.com/v3/businesses/search`;
        superagent.get(url)
            .query(HeaderParameter)
            .set('Authorization', `Bearer ${YELP_API_KEY}`)
            .then(yelpdata  => {
                let arrayOfyelp = yelpdata.body.businesses.map((yelp) => new Yelp(yelp));
            res.send(arrayOfyelp);
        }).catch((err) => {
            res.status(500).send('Error Page in Yelp Handelling',err);
        });
    } catch (error) {
            res.send('erro -> \n' ,error);
    }
}


class Yelp  {

    constructor(yelp) {
        this.name = yelp.name;
        this.image_url = yelp.image_url;
        this.price = yelp.price;
        this.rating = yelp.rating;
        this.url = yelp.url;
    }   
}

module.exports = yelpHandeler;