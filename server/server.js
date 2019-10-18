const verify = require("./verify-parameters.js");

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const {URLSearchParams} = require('url')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// // send the react app
// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
//    });
// // Serve any static files
// app.use(express.static(path.join(__dirname, 'build')));



const API_KEY = process.env.GOOGLE_SECRET_KEY || "test_key";
const BASE_URL = "https://maps.googleapis.com/maps/api/place";

// Return coordinates [lat, long]
getCoordinates = (countryCode, postalCode, res) => {
    const url = "https://maps.googleapis.com/maps/api/geocode/json?components=country:" + countryCode + "|postal_code:" + postalCode + "&key=" + API_KEY;
    console.log(url);
    return (
        axios.get(url)
        .then(response => {
            console.log(response.data);
            return response.data;
        })
        .then(data => {
            console.log("status: " + data.status);
            if(data.status === 'OK') {
                console.log("data.status is OK");
                const location = response.results[0].geometry.location;
                const lat = location.lat;
                const lng = location.lng;
                // return [lat, lng];
                res.send({"coordinates": [lat, lng]});
            }
            else {
                console.log("data.status is NOTOK");
                res.status(400).send({ 
                    "error": data.status,
                    "error_message": data.error_message 
                });
            }
        })
    );
}

// Return a query object
buildQueryObject = (establishment, radius, latitude, longitude) => {
    return (
        {
            type: establishment,
            location: latitude + "," + longitude,
            radius: radius,
            key: API_KEY
        }
    );
}

// Return query object after validating
validateQuery = (queryObject, res) => {
    verifyObject = new verify.verifyClass();
    const countryCode = verifyObject.verifyCountryCode(queryObject.country_code, res);
    const postalCode = verifyObject.verifyPostalCode(queryObject.postal_code, res);
    const establishment = verifyObject.verifyEstablishment(queryObject.establishment, res);
    const radius = verifyObject.verifyRadius(queryObject.radius, res);
    return ( 
        {
            countryCode: countryCode,
            postalCode: postalCode,
            establishment: establishment,
            radius: radius
        }
    );
}

// get nearby establishments
app.get('/api/nearby-establishments', function(req, res) {
    // console.log("before validation");
    queryObject = validateQuery(req.query, res);
    // console.log("after validation");

    const coordinates = getCoordinates(queryObject.countryCode, queryObject.postalCode, res);
    // res.send({"coordinates": coordinates});

    // queryObject = buildQueryObject(queryObject.establishment, queryObject.radius, coordinates[0], coordinates[1]);
    queryObject = buildQueryObject(queryObject.establishment, queryObject.radius, -11, -111);

    
    const queryString = new URLSearchParams(queryObject).toString();
    var url = BASE_URL + "/nearbysearch/json?" + queryString;

    // console.log("nearby-restaurant url: " + url);

    // axios.get(url)
    // .then(response => {
    //     console.log(response);
    //     res.send(response.data);
    // });
    // res.send('{"test": "yes"}');
});

// "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=49.2793855,-123.0328861&radius=1000&type=restaurant&key=" + API_KEY
// "https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=[...]&key=" + API_KEY
// "https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJS4_UvdpwhlQRNHG06Q5i4lk&fields=name,rating,user_ratings_total,price_level,review,formatted_phone_number,photo&key=" + API_KEY

// const countryCode = Verify.verifyCountryCode(req.query.country_code, res);
// const postalCode = Verify.verifyPostalCode(req.query.postal_code, res);
// const establishment = Verify.verifyEstablishment(req.query.establishment, res);
// const radius = Verify.verifyRadius(req.query.radius, res);


app.listen(process.env.PORT || 3001);
