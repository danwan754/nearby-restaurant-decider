import React from 'react';

import InputBar from './InputBar';
import ResultDetail from './ResultDetail';

import '../css/Result.css';

class Result extends React.Component {

    state = {
        placeIDs: [],
        currentPlaceID: '',
        // place: {},
        isLoading: false,
        place: {"formatted_address":"2901 E Hastings St, Vancouver, BC V5K 4W3, Canada","formatted_phone_number":"(604) 253-2311","name":"Triple O's PNE","opening_hours":{"open_now":true,"periods":[{"close":{"day":1,"time":"0000"},"open":{"day":0,"time":"0700"}},{"close":{"day":4,"time":"0000"},"open":{"day":3,"time":"0700"}},{"close":{"day":5,"time":"0000"},"open":{"day":4,"time":"0700"}},{"close":{"day":6,"time":"0100"},"open":{"day":5,"time":"1900"}},{"close":{"day":0,"time":"0100"},"open":{"day":6,"time":"1900"}}],"weekday_text":["Monday: Closed","Tuesday: Closed","Wednesday: 7:00 AM – 12:00 AM","Thursday: 7:00 AM – 12:00 AM","Friday: 7:00 PM – 1:00 AM","Saturday: 7:00 PM – 1:00 AM","Sunday: 7:00 AM – 12:00 AM"]},"photos":[{"height":1080,"html_attributions":["<a href=\"https://maps.google.com/maps/contrib/100224334677399140437/photos\">Adrian Nowland</a>"],"photo_reference":"CmRaAAAAy7cGYLRWfL9sb1JLlFeWvqol1eNugO2lHtYwkuKH80FjQlgzLK9gNnpEkCMfeHWW3LxTP12IWWffG0FnW_aL4A11UuH5lwoTTe5eeoTgjYCX0kjABopaq5NNs21rj8u8EhDvfMSJ09y7hTB6qgJyCf-iGhS-f9TH2VL6u-jXgI5USA25uAm7ow","width":1920},{"height":3024,"html_attributions":["<a href=\"https://maps.google.com/maps/contrib/107453615936044863658/photos\">Ro. H</a>"],"photo_reference":"CmRaAAAAsryv5fAOW5gBQMKtNjdXGoiT6oFAb7A_MlUU2p2ZwyCvcPaIRMzInEStkcL8ejNEIybuVAZlzXQ2EOLqNaO12Vmdy4i5kJm6FuOUsmbZAIP8U_Nf9NYCa1AEGiq9LIMjEhAmrakRIXAw72x9vg7E4PltGhTxCrabsbpK3HQlbFJ8XpSG9Ys52g","width":4032},{"height":1836,"html_attributions":["<a href=\"https://maps.google.com/maps/contrib/106896704011374285125/photos\">Mike Ber</a>"],"photo_reference":"CmRaAAAADPWw_ONAqDFTO_1FNylQy8kB4yd5n-TjvZ9mTomkIryNlSCuqw3J8w9iWCKW9EQq5yFWLV3gQc21ewKsdceiYUX3ETKo1cFSPir61Kr1WA-ITtkfpPRHYqryccLuzs6GEhANoAlcGDYBzYfLRuKRE0dSGhQ80o4I89-g5o_w8sYUwPvudLChIA","width":3264},{"height":1836,"html_attributions":["<a href=\"https://maps.google.com/maps/contrib/102126392119154809081/photos\">Taylor Hurley</a>"],"photo_reference":"CmRaAAAAjlCGWwYOgMhDbkFtFGvFSooR4u0vRTJ7TJgv8O5OQQ1mFID9vaJPgsFlmAbNtzCqb0av6n2Ho4KeymIwCUXZQSu7Y7sBkHONnewNsa5G5GbhJVP1OkePjSdo40dZmbA6EhDWSEp-DbH1pEz8K_QChsjsGhR7zNoca7143NiUucXtaYqCeycNqQ","width":3264},{"height":1836,"html_attributions":["<a href=\"https://maps.google.com/maps/contrib/106896704011374285125/photos\">Mike Ber</a>"],"photo_reference":"CmRaAAAARooEU4YTUwhUEzXmlxCOmL9oIqlr66uUNR0IvfXiRQ8Yyxseehcjd1wXmNNhbZlYIzepXkiSEWVTO2uPPuZUFZQEb0D04tHyZ8OnwsvFLWTZ2Ewvbs7TcWDOhmqx8urxEhDQ15fxxF69tPgFXOv1t1VoGhQVGFVij-yjfY7yNgfL6-WIieTkRQ","width":3264},{"height":5312,"html_attributions":["<a href=\"https://maps.google.com/maps/contrib/113363816576039473159/photos\">Chris C</a>"],"photo_reference":"CmRaAAAAsIu0Q4cOwwuW_KcMFNKNNcEQWHEGRlTLt7agjMUIaJpVfZCI7OzbXsl8xEaKEBNg-4llFDK0xBeX4x7UCh8b6-aXi8ugnPnYKpsMQOJ_jpAAKSDCHAr8jvK7JS7x1wUWEhDnuIaSd0C7foCGuz9Issm0GhRp05ZNnotXalvBxs1HmD_HAfzf3g","width":2988},{"height":1836,"html_attributions":["<a href=\"https://maps.google.com/maps/contrib/106896704011374285125/photos\">Mike Ber</a>"],"photo_reference":"CmRaAAAAHr1Fd1BXFBn4zoVXaT2EqkUvRGupOi5xaAymTfvxLOtfsf2K-l568tPw-I-155oHtBGjxQxjj4gQ8a73cKFoOytJoMWntxMaRF2-zu2XRUUynHxvy4CQOife1neZU3VWEhC2in7JRW-O-PjMsmsdw6ikGhRzsTouYKAZ9vhAiIs6wbxtYsohcg","width":3264},{"height":1836,"html_attributions":["<a href=\"https://maps.google.com/maps/contrib/106896704011374285125/photos\">Mike Ber</a>"],"photo_reference":"CmRaAAAACvM9YwQsVDCo2zB9iibtIwlq1WUsjUGSo_GPZKSkjOGBUKpdpIPACvWmGpy1ReAepFqLP7mdkEH5KeWJ8vXZ2s5CXu9USlDH0KCVg4jk3SX0HcnjVQ1qZmKFMGJQujgkEhCmAQblNZjNeJY0NYSGsO1OGhTbG_mazomnIhD8aVrUaF5iB40Vug","width":3264},{"height":5312,"html_attributions":["<a href=\"https://maps.google.com/maps/contrib/106289762590366203757/photos\">Jagjit Singh</a>"],"photo_reference":"CmRaAAAAWAUqV35awjbgnqItZeV8bVMKULMABptJULRHmEnTchVFJwxN6Gg5yzFFBWrdRWJJ5_eHzF4GD4zMleRsdajDlYIh4pSfXI8BCGq_1R9GD9imFT5Qq1AItb1Q0tmvsgV2EhBadYhvHb90XiwAHCjQrMlHGhRc8ga1PlR4f28Qh9dkOOhkLMJQtw","width":2988},{"height":3024,"html_attributions":["<a href=\"https://maps.google.com/maps/contrib/107512635189323923905/photos\">Himright</a>"],"photo_reference":"CmRaAAAA3pNiuGQLcZ61sp1RcBYlw_ctT5Xc-IfotZzCSd72wpfJ_6DXOXOVLwnJzC7ujEG8VFtEo74yvXJ39CxZB92LofUYKXOtUzA7B0ld6km8g__ft215o6IYbEPyRGPXjJ_6EhASyjOk8WEP5E0KeTbIMNmSGhRXUufIZPE1-DJmnErDsP_-Sg31ZQ","width":4032}],"rating":3,"reviews":[{"author_name":"Iker Castaneda","author_url":"https://www.google.com/maps/contrib/113238725898912186357/reviews","language":"en","profile_photo_url":"https://lh3.ggpht.com/-rHqRhcVWxg4/AAAAAAAAAAI/AAAAAAAAAAA/FIVrGOeNXwU/s128-c0x00000000-cc-rp-mo/photo.jpg","rating":5,"relative_time_description":"a month ago","text":"The food is regularly fresh and tasty, workers hands over good customer service. I like how clean it is and mood. Worth a try.","time":1568651144},{"author_name":"Q Hernandez","author_url":"https://www.google.com/maps/contrib/116181442800175821392/reviews","language":"en","profile_photo_url":"https://lh3.ggpht.com/-FKvP3M1-K-Q/AAAAAAAAAAI/AAAAAAAAAAA/6cjR5JDFCyI/s128-c0x00000000-cc-rp-mo/photo.jpg","rating":5,"relative_time_description":"a month ago","text":"I actually enjoy their food and customer service, awesome area right next to my residence. The cashiers are always friendly. Would recommend to others.","time":1568219607},{"author_name":"Lucas Werner","author_url":"https://www.google.com/maps/contrib/110641468563275528770/reviews","language":"en","profile_photo_url":"https://lh4.ggpht.com/-K30_t2Cn_yk/AAAAAAAAAAI/AAAAAAAAAAA/bqbgs1eaGss/s128-c0x00000000-cc-rp-mo/photo.jpg","rating":5,"relative_time_description":"a month ago","text":"The menu and service were ahead of my expectations. I really loved the atmosphere of this restaurant. Extraordinary restaurant to take the family out for lunch.","time":1568308007},{"author_name":"Geneve McNally","author_url":"https://www.google.com/maps/contrib/102550053205482953686/reviews","language":"en","profile_photo_url":"https://lh5.ggpht.com/-GfB0dN5UedU/AAAAAAAAAAI/AAAAAAAAAAA/_-b0ncV3Gzs/s128-c0x00000000-cc-rp-mo/photo.jpg","rating":2,"relative_time_description":"a month ago","text":"Waited at the order window for 20 minutes with no movement whatsoever. Then once we finally received our food 35 minutes later it was wrong... missing fries and forgot to remove tomatoes from burger. Also the poutine gravy was put on under the curds rather than on top AND we had to wait another 12 minutes for forks which ran out. Poutine was cold by the time we were able to eat it. Understaffed. Inexcusable on a not very busy Thursday. Disappointed.","time":1567113023},{"author_name":"Lori Dalby","author_url":"https://www.google.com/maps/contrib/109074697175849165833/reviews","language":"en","profile_photo_url":"https://lh5.ggpht.com/-wJc7PQC-hBY/AAAAAAAAAAI/AAAAAAAAAAA/JRNwZJo1pD4/s128-c0x00000000-cc-rp-mo/photo.jpg","rating":1,"relative_time_description":"2 months ago","text":"too expensive... triple o burger had zero sauce... handed burger back in for sauce...waited 15 min. had to ask someoneto find my burger, handed back to me with still no sauce. dry. yuck! \nplace was messy, and the staff seemed confused.","time":1565478499}],"user_ratings_total":104,"website":"http://www.tripleos.com/"}
    }

    constructor() {
        super();
        this.getNearbyEstablishments = this.getNearbyEstablishments.bind(this);
        this.selectRandomPlace = this.selectRandomPlace.bind(this);
        this.deletePlace = this.deletePlace.bind(this);
        this.getPlaceDetails = this.getPlaceDetails.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSkip = this.handleSkip.bind(this);
    }

    componentDidMount() {
        var queryObject = this.props.location ? this.props.location.state : false;
        // console.log(this.props.location.state);

        // query data given by home page
        if (!queryObject){
            console.log("nothing");
            return;
        }
        // query_data = props.location.state.query_data;

        this.getNearbyEstablishments(queryObject);
    }

    getNearbyEstablishments(queryObject) {
        var queryString = new URLSearchParams(queryObject).toString();
        console.log(queryString);
        var url = '/api/nearby-establishments?' + queryString;
        this.setState({ isLoading: true });
        fetch(url)
        .then(response => { 
            if (response.ok) {
                return response.json();
            }
            else {
                throw new Error("Error: status code " + response.status);
            }
        })
        .then(result => {
            console.log("result: " + result);
            this.setState({ placeIDs: result });
            const index = this.selectRandomPlace(result);
            this.getPlaceDetails(result[index]);
        })
        .catch(error => {
            this.setState({ isLoading: false });
            console.log("error caught: " + error);
        });
    }

    // randomly select a place from list of places
    selectRandomPlace(placeIDs) {
        const length = placeIDs.length;
        if (length === 0) {
            return null;
        }
        const index = Math.floor((Math.random() * length) + 1);
        this.setState({ currentPlaceID: placeIDs[index] });
        return index;
    }

    // delete a place from list of places
    // deletePlace(index) {
    deletePlace() {
        // var placeIDs = this.state.placeIDs.slice();
        // console.log(placeIDs);
        // console.log(this.state.placeIDs);
        const placeIDs = this.state.placeIDs.filter(place => place !== this.state.currentPlaceID);
        // placeIDs.splice(index, 1);
        // console.log(placeIDs);
        this.setState({ 
            placeIDs: placeIDs,
            place: ''
        });
        return placeIDs;
    }

    // fetch place details
    getPlaceDetails(placeID) {
        var url = "/api/place-details" + "?place_id=" + placeID;
        fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            else {
                throw new Error("Error: status code " + response.status);
            }
        })
        .then(result => {
            this.setState({ 
                place: result,
                isLoading: false
             });
        })
        .catch(error => {
            console.log(error);
            this.setState({ 
                place: {},
                isLoading: false
            });
        });
    }

    handleSubmit(query_object) {
        this.getNearbyEstablishments(query_object);
        // this.setState({
        //     query_data: query_object
        // });
    }

    // delete the current place object from results and show the new place
    handleSkip() {
        const placeIDs = this.deletePlace();
        const index = this.selectRandomPlace();
        this.getPlaceDetails(placeIDs[index]);
    }



    render() {
        return(
            <div className="result-container">
                <InputBar
                    onSubmit={this.handleSubmit} />
                { this.state.isLoading ? "Loading ..." : (
                    <React.Fragment>
                        <ResultDetail 
                            place={this.state.place}
                            onSubmit={this.handleSkip} />
                        {/* <input 
                            type='button'
                            value='Skip' 
                            id='skip-button'
                            onClick={ this.handleSkip() }>
                        </input> */}
                    </React.Fragment>
                )}
                {/* { this.state.isLoading ? "Loading ..." : (
                    <div>
                        <div>{ this.state.placeIDs.length > 0 ? this.state.placeIDs : 'nothing' }</div>
                        <div>{ this.state.currentPlaceID ? this.state.currentPlaceID : 'nothing' }</div>
                        <div>{ Object.keys(this.state.place).length > 0 ? JSON.stringify(this.state.place) : 'nothing' }</div>
                    </div> 
                )}   */}
            </div>
        );
    }
}

export default Result;