const verify = require("./verify-parameters.js");
const { GoogleRequestException } = require('./error.js');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const request = require('request');
var nodemailer = require('nodemailer');
const {URLSearchParams} = require('url');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// Serve all static files
app.use(express.static(path.join(__dirname, 'client/build')));

// Serve index.html on unknown routes
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});


const API_KEY = process.env.GOOGLE_API_KEY || "test_key";
const BASE_PLACE_URL = "https://maps.googleapis.com/maps/api/place";
const BASE_GEOCODE_URL = "https://maps.googleapis.com/maps/api/geocode/json";
const BASE_PHOTO_URL = "https://maps.googleapis.com/maps/api/place/photo";
const PLACE_DETAILS_URL = BASE_PLACE_URL + "/details/json?place_id=";
const PLACE_DETAILS_PARAMS = "&fields=name,rating,user_ratings_total,price_level,review,formatted_phone_number,opening_hours,website,photo,formatted_address&key=" + API_KEY;


// Return coordinates [lat, long]
getCoordinates = (countryCode, postalCode, res) => {
    const url = BASE_GEOCODE_URL + "?components=country:" + countryCode + "|postal_code:" + postalCode + "&key=" + API_KEY;
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
            throw error;
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
    response.send({ 
        "error": status,
        "error_message": error_message 
    });
}

// get nearby establishments
app.get('/api/nearby-establishments', async function(req, res) {
    let queryObject;
    let coordinates;
    try {
        queryObject = validateQuery(req.query);
        coordinates = await getCoordinates(queryObject.countryCode, queryObject.postalCode, res);
    } catch(e) {
        sendErrorResponse(e.status, e.message, res);
        return;
    }
    queryObject = buildQueryObject(queryObject.establishment, queryObject.radius, coordinates[0], coordinates[1]);    
    const queryString = new URLSearchParams(queryObject).toString();
    var url = BASE_PLACE_URL + "/nearbysearch/json?" + queryString;

    axios.get(url)
    .then(response => {
        let data = response.data;

        if (data.status === 'OK') {
            // get the place_id from every place
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
    let url = PLACE_DETAILS_URL + place_id + PLACE_DETAILS_PARAMS;
    // console.log(url);

    axios.get(url)
    .then(response => {
        let data = response.data;
        // console.log(data.result);
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
    const url = BASE_PHOTO_URL + "?maxwidth=300&photoreference=" + photo_id +"&key=" + API_KEY;
    request.get(url).pipe(res);

    // res.sendFile(__dirname + '/canada.png'); // for testing
});

app.post('/api/contact', function(req, res) {
    const email = req.body.email ? req.body.email : 'Anonymous';
    const subject = req.body.subject ? req.body.subject : 'No subject';
    const message = req.body.message;
    // console.log(req.body);
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NEARBY_RESTAURANT_EMAIL,
        pass: process.env.NEARBY_RESTAURANT_EMAIL_PASSWORD
      }
    });
    
    var mailOptions = {
      from: process.env.NEARBY_RESTAURANT_EMAIL,
      to: process.env.NEARBY_RESTAURANT_EMAIL,
      subject: subject + "; from " + email,
      text: message
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        sendErrorResponse(error.name, error.message, res);
      } else {
        console.log('Email sent: ' + info.response);
        res.send({status: 'success'});
      }
    });
});

app.listen(process.env.PORT || 3001);
