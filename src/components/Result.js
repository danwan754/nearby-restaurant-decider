import React from 'react';

import InputBar from './InputBar';
import ResultDetail from './ResultDetail';
import EndResult from './EndResult';
import { getPlaceDetails, getNearByEstablishments, fetchPhoto } from '../requests';

import '../css/Result.css';

class Result extends React.Component {

    state = {
        isLoading: false,
        isEnd: false,
        mainPhotoURL: '',
        errorMessage: '',
        placeIDs: [],
        // placeIDs: [0],
        currentPlaceID: '',
        // currentPlaceID: 0,
        photoIDs: [],
        // photoIDs: ['id1', 'id2', 'id3', 'id4', 'id5', 'id6', 'id7'],
        place: {}
        // place: {        "formatted_address": "3444 E Hastings St, Vancouver, BC V5K 2A6, Canada",        "formatted_phone_number": "(604) 718-1099",        "name": "McDonald's",        "opening_hours": {            "open_now": true,            "periods": [                {                    "open": {                        "day": 0,                        "time": "0000"                    }                }            ],            "weekday_text": [                "Monday: Open 24 hours",                "Tuesday: Open 24 hours",                "Wednesday: Open 24 hours",                "Thursday: Open 24 hours",                "Friday: Open 24 hours",                "Saturday: Open 24 hours",                "Sunday: Open 24 hours"            ]        },        "photos": [            {                "height": 600,                "html_attributions": [                    "<a href=\"https://maps.google.com/maps/contrib/108910553776635962305/photos\">Goldwyn Tong</a>"                ],                "photo_reference": "CmRaAAAA91c-9BUEFsip9osfPcWj98jOSYTrNU55wQG_q8Ri4o9wWOpPnIWvbdoMR3NwLgW7na4upFlUZ5FThbAm28n3_cc0wxGAuQ3KoULKByUUKx_m42d-YvBrS0ptULuUG8RpEhBUY_AJAYvUC77aRcDFZkznGhS-BS2nsc3w6sYIhPuqGEXtsSJkQw",                "width": 900            },            {                "height": 2988,                "html_attributions": [                    "<a href=\"https://maps.google.com/maps/contrib/106664308913771995442/photos\">Chrispy Kremer123</a>"                ],                "photo_reference": "CmRaAAAA8oIg5v2-WPHvAe2krYneP0ljvH2SQSoeNCgIvxSmNvScc0ox0SV-bIeN60x-GSBlGgmxsQuLEk2mjATEu_losPE1SWZ8t6GVTDj81aw0NIQXakkAbiXLbIVlverSJFKwEhDqrFGDCUL6Da68ZXC0E0ciGhTfMVkVtJPW70mgu6SvOdJ689fvzw",                "width": 5312            },            {                "height": 2988,                "html_attributions": [                    "<a href=\"https://maps.google.com/maps/contrib/114087585847104561306/photos\">Sacha Joubert</a>"                ],                "photo_reference": "CmRaAAAAd2Iw-hEljEKZqfQ8dC7L1oOnLvchADk5I_kWjZ54IzD188czjo1gaHfvdy277Wb5blmcbQitwIHGEjEWUiaQgM1fdNoL0XQqn_1xYjwOTvO4bxZ5aci-86yNDn0W-kUqEhApg1yoSqdorDQUqMueXr4_GhRi1l4tm1AbG8Uyj5BF7Tj3zr3fmQ",                "width": 5312            },            {                "height": 3120,                "html_attributions": [                    "<a href=\"https://maps.google.com/maps/contrib/107551487495629283773/photos\">Edna Lee</a>"                ],                "photo_reference": "CmRaAAAAXFiEHqEAGzLOH5vHOEa4nmkOyBOsTka4EfF5clxC4lJHvjd57viYcPMIkdZqnWmhsbDwMoGOOKwdvfPCpSCqMwN0OTW9cvqLiGSImkLzB6BMVQlrKjdgYRZ0yoMT6_F2EhDPLPZThZDckxqXvamTyGTMGhT3hg-HKC7wX-_OO9nXVAhk_oUq3Q",                "width": 4160            },            {                "height": 2268,                "html_attributions": [                    "<a href=\"https://maps.google.com/maps/contrib/114289784955953243909/photos\">Dan Nan</a>"                ],                "photo_reference": "CmRaAAAAfj4w5t14IWiA6R-XrWXLS7VssIx6nOd9GPzj9ObVUe6hOqiilfJw9xI6JfgZhe2O018n2hjCbOietILMXM9tVA0QPx0oUmeuE_BUqk_eYdQZarvxpbptSK2_S171fDP4EhD8Snwtcosv69yLfJkzGDRuGhRl2Qfdsb4X9e2uPa3SOPD5thhOTA",                "width": 4032            },            {                "height": 2160,                "html_attributions": [                    "<a href=\"https://maps.google.com/maps/contrib/107976270155352800018/photos\">Simon Kwok</a>"                ],                "photo_reference": "CmRaAAAAxs-UaZcHZG102AnSghj1EjAaAg2ungzxH9-kUZZ9dJSqwlLPfwByOvdFNQlxun55_1anfRjQYLx-4JBt6T5T7A0mZfxECkkYWjn4QqpRJHzpdJy931QzUHJMsp-aqOauEhA6SLiDAoFpExOKODJlxYKhGhSnUonVocTvrjBqLFgAVFAd_GzESg",                "width": 3840            },            {                "height": 2988,                "html_attributions": [                    "<a href=\"https://maps.google.com/maps/contrib/112777714159494658046/photos\">Andy F</a>"                ],                "photo_reference": "CmRaAAAATOESgYAYm_RLPlXPZld99RX5WHG-kmLW8cAHnRr5PwaSfIyjHdPHo_HtDSIxQvbQ-0jP8B_IjQE-hskqFqG1zkdyEi4HOfMw3Nj4gaqW7BICpZczXARFiSaa3AODuYSVEhALM0URnp_P9Wq3LI5tJjmZGhQ-mOe6pa8gN88QmUcaaV0L8_3dJg",                "width": 5312            },            {                "height": 2160,                "html_attributions": [                    "<a href=\"https://maps.google.com/maps/contrib/107976270155352800018/photos\">Simon Kwok</a>"                ],                "photo_reference": "CmRaAAAAvjUAAG5f3yOYCx8LrDYl-uDOMVwZi27AX9yeWlKlBP7Mcv_0ok3cjZN1SsuHF11WdIAcNkJEM9PiZ8sXpd_MYX2QmkJTs-PPY2BLnlSwgxwYgE66unEHHE1V00KxL8-xEhA0x-NKFgpNDL-rfdnAa6IeGhSPBRekTobm57g2yZA-Z3_6WYCTIQ",                "width": 3840            },            {                "height": 3264,                "html_attributions": [                    "<a href=\"https://maps.google.com/maps/contrib/101436115038523449853/photos\">graeme price</a>"                ],                "photo_reference": "CmRaAAAARFqGQfBdDumrJCsKS8VwyH57KuT6mFJ5yuRPYuJtl-3pzvZHCENZS8V1b5t8dm7H5uOK7VcMbGRwp2tN0HGYGDb2ZhLDyrNNlgzi88Wy0PZRxoxStCcKIPo446i_NBMWEhC59tTDRfvobXMAWvNKPd-KGhRwH3tGAziujqcjg5eoOlfVuuG3zQ",                "width": 1836            },            {                "height": 3984,                "html_attributions": [                    "<a href=\"https://maps.google.com/maps/contrib/110399179434522120980/photos\">Kevin D</a>"                ],                "photo_reference": "CmRaAAAAmBMruIex-RHGYeroVC8HtAOQ7TRxqMaipjXBKvfKqlHiHra0ABHgXjL5pa9aBd9ihoQ4U9xd1YJiwr65ZFqZQpF97rH65LURVt7C8uMsozm5U9EyDBoE5f1ywIi1du1VEhDH7HxGaIdyMgH5FXQidGSvGhRi0-T94eDNPO4DC5KWS3yDruQsvg",                "width": 2988            }        ],        "price_level": 1,        "rating": 3.4,        "reviews": [            {                "author_name": "Gerard Helmer",                "author_url": "https://www.google.com/maps/contrib/106973170486855121127/reviews",                "language": "en",                "profile_photo_url": "https://lh3.ggpht.com/-LCSm1ZduNAk/AAAAAAAAAAI/AAAAAAAAAAA/X4zo54jkjlU/s128-c0x00000000-cc-rp-mo-ba2/photo.jpg",                "rating": 5,                "relative_time_description": "in the last week",                "text": "Just right, exactly as you expect (that's a good thing) from McDonald's!  Great quality food, not over salted and old and economical (cheap) price so win/win am I right?  Friendly staff and nice manager whilst there.",                "time": 1573363383            },            {                "author_name": "Alberto Mayer",                "author_url": "https://www.google.com/maps/contrib/108416254055963552966/reviews",                "language": "en",                "profile_photo_url": "https://lh4.ggpht.com/-ZNC6G3XsnjI/AAAAAAAAAAI/AAAAAAAAAAA/mEkATX36KII/s128-c0x00000000-cc-rp-mo-ba2/photo.jpg",                "rating": 5,                "relative_time_description": "a month ago",                "text": "We came to this place for lunch. This spot was recommended to us by a friend.  Well, we were not disappointed. The crew welcomed us with a smile and we felt very good. The food was just great. We loved this restaurant a lot and we will definitely return to this restaurant. Highly recommended.",                "time": 1568392177            },            {                "author_name": "Musa Booth",                "author_url": "https://www.google.com/maps/contrib/117859099006496187906/reviews",                "language": "en",                "profile_photo_url": "https://lh5.ggpht.com/-_iK64d6ygYc/AAAAAAAAAAI/AAAAAAAAAAA/uBD84gP2PLA/s128-c0x00000000-cc-rp-mo/photo.jpg",                "rating": 5,                "relative_time_description": "a month ago",                "text": "I adore this spot! They give high class food, their menu is varied, The chief cook in that restaurant is very trained, I like very much tasting all their food. The dishes are consistently of high class, the attitude towards the customers  is very good too. I often go to  this restaurant and I not even once was unsatisfied. Highly recommended.",                "time": 1568662823            },            {                "author_name": "Maxim Castro",                "author_url": "https://www.google.com/maps/contrib/102318503909187288919/reviews",                "language": "en",                "profile_photo_url": "https://lh6.ggpht.com/-ciPtTkdfd7k/AAAAAAAAAAI/AAAAAAAAAAA/Girc6u0qQao/s128-c0x00000000-cc-rp-mo/photo.jpg",                "rating": 5,                "relative_time_description": "a month ago",                "text": "I love this spot! They give first-rate meals, they have a rich menu, The chef in that restaurant is a real pro, I love a lot tasting all their dishes. The food is consistently good, the attitude towards the guests  is friendly. I visit often this restaurant and I was never unhappy. I recommend it with no hesitation.",                "time": 1568643967            },            {                "author_name": "Gideon Adams",                "author_url": "https://www.google.com/maps/contrib/113690983876116895877/reviews",                "language": "en",                "profile_photo_url": "https://lh4.ggpht.com/-nrs_ubDL3LI/AAAAAAAAAAI/AAAAAAAAAAA/yqHsK5niIZ4/s128-c0x00000000-cc-rp-mo/photo.jpg",                "rating": 5,                "relative_time_description": "2 months ago",                "text": "Excellent ambience and super friendly service. The food was crisp and delicious. Will clearly recommend this place to others. Convenient prices and large meals. Keep it up.",                "time": 1567102980            }        ],        "user_ratings_total": 1274,        "website": "https://www.mcdonalds.com/ca/en-ca/restaurant-locator.html"    }
    }

    constructor() {
        super();
        this.getEstablishments = this.getEstablishments.bind(this);
        this.selectRandomPlace = this.selectRandomPlace.bind(this);
        this.deletePlace = this.deletePlace.bind(this);
        this.getPhotoIDs = this.getPhotoIDs.bind(this);
        this.getNewPlace = this.getNewPlace.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSkip = this.handleSkip.bind(this);
    }

    componentDidMount() {
        var queryObject = this.props.location ? this.props.location.state : {};

        // query data given by home page
        if (!queryObject){
            return;
        }
        this.getEstablishments(queryObject);
    }

    async getEstablishments(queryObject) {
        var queryString = new URLSearchParams(queryObject).toString();
        this.setState({ isLoading: true });
        try {
            const placeIDs = await getNearByEstablishments(queryString);
            await this.getNewPlace(placeIDs, false);
        }        
        catch(error) {
            // console.log(error);
            this.setState({ 
                errorMessage: error.message,
                isLoading: false 
            });
            return;
        }
    }

    // randomly select a place from list of places
    selectRandomPlace(placeIDs) {
        const length = placeIDs.length;
        if (length === 0) {
            return -1;
        }
        const index = Math.floor((Math.random() * length));
        // this.setState({ currentPlaceID: placeIDs[index] });
        return index;
    }

    // extract photo IDs from place details object
    getPhotoIDs(placeDetails) {
        let photoIDs = [];
        if (placeDetails.hasOwnProperty('photos')) {
            for (var i = 0; i < placeDetails.photos.length; i++) {
                photoIDs.push(placeDetails.photos[i].photo_reference);
            }
        }
        return photoIDs;
    }

    // delete a place from list of places
    deletePlace() {
        const placeIDs = this.state.placeIDs.filter(place => place !== this.state.currentPlaceID);
        return placeIDs;
    }

    // get new place and update states
    async getNewPlace(placeIDs, isEnd) {
        const index = this.selectRandomPlace(placeIDs);
        const placeDetails = index > -1 ? await getPlaceDetails(placeIDs[index]) : {};
        const photoIDs = this.getPhotoIDs(placeDetails);
        const mainPhotoURL = photoIDs.length > 0 ? await fetchPhoto(photoIDs[0]) : '';
        const currentPlaceID = index > -1 ? placeIDs[index] : '';
        this.setState({ 
            placeIDs: placeIDs,
            currentPlaceID: currentPlaceID,
            place: placeDetails,
            photoIDs: photoIDs,
            mainPhotoURL: mainPhotoURL,
            errorMessage: '',
            isLoading: false,
            isEnd: isEnd
        });
    } 

    handleSubmit(query_object) {
        this.getEstablishments(query_object);
    }

    // delete the current place object from results and show the new place
    async handleSkip() {
        this.setState({ isLoading: true });
        try {
            const placeIDs = this.deletePlace();
            const isEnd = placeIDs.length > 0 ? false : true;
            await this.getNewPlace(placeIDs, isEnd);
        }
        catch(error) {
            this.setState({
                errorMessage: error.message,
                isLoading: false
            });
        }
    }

    render() {
        return(
            <div className="result-container">
                <InputBar
                    query_data={this.props.location.state}
                    onSubmit={this.handleSubmit} />
                { this.state.isLoading ? "Loading ..." :
                    this.state.isEnd ?
                        <EndResult />
                        : 
                        this.state.errorMessage ? this.state.errorMessage 
                            :
                            <React.Fragment>
                                <ResultDetail 
                                    placeID={this.state.currentPlaceID}
                                    place={this.state.place}
                                    photoIDs={this.state.photoIDs}
                                    mainPhotoURL={this.state.mainPhotoURL}
                                    onSubmit={this.handleSkip} />
                                { this.state.placeIDs.length > 0 ?
                                    <input 
                                        id='skipButton'
                                        type='button'
                                        value='Skip'
                                        onClick={ this.handleSkip }
                                        >
                                    </input>
                                    : ''
                                }
                            </React.Fragment>
                }
            </div>
        );
    }
}

export default Result;