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
const BASE_PLACE_URL = "https://maps.googleapis.com/maps/api/place";
const BASE_GEOCODE_URL = "https://maps.googleapis.com/maps/api/geocode/json";

// Return coordinates [lat, long]
getCoordinates = (countryCode, postalCode, res) => {

    // url like https://maps.googleapis.com/maps/api/geocode/json?components=country:ca|postal_code:v5h3j4&key="api_key"
    const url = BASE_GEOCODE_URL + "?components=country:" + countryCode + "|postal_code:" + postalCode + "&key=" + API_KEY;
    console.log(url);
    return (
        axios.get(url)
        .then(response => {
            // console.log(response.data);
            return response.data;
        })
        .then(data => {
            // console.log("status: " + data.status);
            if(data.status === 'OK') {
                console.log("data.status is OK");
                const location = data.results[0].geometry.location;
                const lat = location.lat;
                const lng = location.lng;
                return [lat, lng];
                // res.send({"coordinates": [lat, lng]});
            }
            else {
                console.log("data.status is NOTOK");
                // res.status(400).send({ 
                //     "error": data.status,
                //     "error_message": data.error_message 
                // });
                sendErrorResponse(data.status, data.error_message, res);
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

// return error message for fail Google API call
sendErrorResponse = (status, error_message, response) => {
    response.status(400).send({ 
        "error": status,
        "error_message": error_message 
    });
}


// get nearby establishments
app.get('/api/nearby-establishments', async function(req, res) {
    queryObject = validateQuery(req.query, res);

    const coordinates = await getCoordinates(queryObject.countryCode, queryObject.postalCode, res);

    queryObject = buildQueryObject(queryObject.establishment, queryObject.radius, coordinates[0], coordinates[1]);
    // queryObject = buildQueryObject(queryObject.establishment, queryObject.radius, -11, -111);
    
    const queryString = new URLSearchParams(queryObject).toString();

    // url like https://maps.googleapis.com/maps/api/place/nearbysearch/json?type=restaurant&location=49.44444%2C-123.222222&radius=1000&key="api_key"
    var url = BASE_PLACE_URL + "/nearbysearch/json?" + queryString;

    // console.log("nearby-restaurant url: " + url);

    axios.get(url)
    .then(response => {
        return response.data;
    })
    .then(data => {
        // console.log(data);

        if (data.status == 'OK') {
            // get the place_id for every place
            place_ids = data.results.map(place => place.place_id)
            // console.log(place_ids);

            res.send(place_ids);
        }
        else {
            sendErrorResponse(data.status, data.error_message, res);
        }
    });
});


// get establishment details
app.get('/api/place-details', async function(req, res) {
    const place_id = req.query.place_id;
    var url = BASE_PLACE_URL + "/details/json?place_id=" + place_id + "&fields=name,rating,user_ratings_total,price_level,review,formatted_phone_number,photo&key=" + API_KEY
    console.log(url);

    axios.get(url)
    .then(response => {
        return response.data;
    })
    .then(data => {
        console.log(data);
        if (data.status == 'OK') {
            res.send(data);
        }
        else {
            sendErrorResponse(data.status, data.error_message, res);
        }
    });
});


// "https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=[...]&key=" + API_KEY
// "https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJS4_UvdpwhlQRNHG06Q5i4lk&fields=name,rating,user_ratings_total,price_level,review,formatted_phone_number,photo&key=" + API_KEY

// const countryCode = Verify.verifyCountryCode(req.query.country_code, res);
// const postalCode = Verify.verifyPostalCode(req.query.postal_code, res);
// const establishment = Verify.verifyEstablishment(req.query.establishment, res);
// const radius = Verify.verifyRadius(req.query.radius, res);


app.listen(process.env.PORT || 3001);
