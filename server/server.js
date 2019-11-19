const verify = require("./verify-parameters.js");
const { GoogleRequestException } = require('./error.js');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const {URLSearchParams} = require('url');

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
const BASE_PLACE_URL = "https://maps.googleapis.com/maps/api/place";
const BASE_GEOCODE_URL = "https://maps.googleapis.com/maps/api/geocode/json";
const BASE_PHOTO_URL = "https://maps.googleapis.com/maps/api/place/photo";
const PLACE_DETAILS_URL = BASE_PLACE_URL + "/details/json?place_id=";
const PLACE_DETAILS_PARAMS = "&fields=name,rating,user_ratings_total,price_level,review,formatted_phone_number,opening_hours,website,photo,formatted_address&key=" + API_KEY;


// Return coordinates [lat, long]
getCoordinates = (countryCode, postalCode, res) => {

    // url like https://maps.googleapis.com/maps/api/geocode/json?components=country:ca|postal_code:v1v1v1&key="api_key"
    const url = BASE_GEOCODE_URL + "?components=country:" + countryCode + "|postal_code:" + postalCode + "&key=" + API_KEY;
    // console.log(url);
    return (
        axios.get(url)
        .then(response => {
            let data = response.data;
            if(data.status === 'OK') {
                const location = data.results[0].geometry.location;
                const lat = location.lat;
                const lng = location.lng;
                return [lat, lng];
            }
            else {
                throw new GoogleRequestException(data.status);
            }
        })
        .catch(error => {
            console.log('Error in geocoding postal code.');
            sendErrorResponse(error.status, error.message, res);
        })
    )
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
validateQuery = (queryObject) => {
    verifyObject = new verify.verifyClass();
    const countryCode = verifyObject.verifyCountryCode(queryObject.country_code);
    const postalCode = verifyObject.verifyPostalCode(queryObject.postal_code);
    const establishment = verifyObject.verifyEstablishment(queryObject.establishment);
    const radius = verifyObject.verifyRadius(queryObject.radius);
    return ( 
        {
            countryCode: countryCode,
            postalCode: postalCode,
            establishment: establishment,
            radius: radius
        }
    );
}

// return error message for fail Google API call
sendErrorResponse = (status, error_message, response) => {
    if (status === 500) {
        error_message = 'Internal server error. Please try again.';
    }
    response.status(500).send({ 
        "error": status,
        "error_message": error_message 
    });
}

// get nearby establishments
app.get('/api/nearby-establishments', async function(req, res) {

    try {
        queryObject = validateQuery(req.query);
    } catch(e) {
        sendErrorResponse(e.status, e.message, res);
        return;
    }
    const coordinates = await getCoordinates(queryObject.countryCode, queryObject.postalCode, res);
    queryObject = buildQueryObject(queryObject.establishment, queryObject.radius, coordinates[0], coordinates[1]);    
    const queryString = new URLSearchParams(queryObject).toString();
    var url = BASE_PLACE_URL + "/nearbysearch/json?" + queryString;

    axios.get(url)
    .then(response => {
        let data = response.data;
        // console.log(data);

        if (data.status === 'OK') {
            // get the place_id for every place
            place_ids = data.results.map(place => place.place_id)
            res.send(place_ids);
        }
        else {
            throw new GoogleRequestException(data.status);
        }
    })
    .catch(error => {
        console.log("error in nearby-establishments");
        sendErrorResponse(error.status, error.message, res);
    });
});


// get establishment details
app.get('/api/place-details', async function(req, res) {
    const place_id = req.query.place_id;
    // var url = BASE_PLACE_URL + "/details/json?place_id=" + place_id + "&fields=name,rating,user_ratings_total,price_level,review,formatted_phone_number,opening_hours,website,photo,formatted_address&key=" + API_KEY;
    let url = PLACE_DETAILS_URL + place_id + PLACE_DETAILS_PARAMS;
    // console.log(url);

    axios.get(url)
    .then(response => {
        let data = response.data;
        console.log(data.result);
        if (data.status == 'OK') {
            res.send(data.result);
        }
        else {
            throw new GoogleRequestException(data.status);
        }
    })
    .catch(error => {
        sendErrorResponse(error.status, error.message, res);
    });
});


app.get('/api/photo', async function(req, res) {
    const photo_id = req.query.id;
    // console.log(photo_id);
    // const url = BASE_PHOTO_URL + "?maxwidth="
    res.sendFile(__dirname + '/canada.png');

});


// "https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=[...]&key=" + API_KEY


app.listen(process.env.PORT || 3001);
