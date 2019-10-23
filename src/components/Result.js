import React from 'react';

import InputBar from './InputBar';
import ResultDetail from './ResultDetail';

import '../css/Result.css';

class Result extends React.Component {

    state = {
        placeIDs: [],
        currentPlaceID: '',
        place: {}
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
        var queryObject = this.props.location.state;
        console.log(this.props.location.state);

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
            console.log(result);
            this.setState({ placeIDs: result });
            const index = this.selectRandomPlace(result);
            this.getPlaceDetails(result[index]);
        })
        .catch(error => {
            console.log(error);
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
        console.log(this.state.placeIDs);
        const placeIDs = this.state.placeIDs.map(place => place != this.state.currentPlaceID);
        // placeIDs.splice(index, 1);
        console.log(placeIDs);
        this.setState({ placeIDs: placeIDs });
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
            this.setState({ place: result });
        })
        .catch(error => {
            console.log(error);
            this.setState({ place: {} });
        });
    }

    handleSubmit(query_object) {
        this.setState({
            query_data: query_object
        });
    }

    // delete the current place object from results and show the new place
    handleSkip() {
        const placeIDs = deletePlace();
        const index = this.selectRandomPlace();
        this.getPlaceDetails(placeIDs[index]);
    }



    render() {
        return(
            <div className="result-container">
                <InputBar
                    onSubmit={this.handleSubmit} />
                {/* <ResultDetail 
                    place={this.state.place}
                    onSubmit={this.handleSkip} /> */}
                {/* <div>{ Object.keys(this.state.results).length ? JSON.stringify(this.state.results) : 'nothing'}</div>    */}
            </div>
        );
    }
}

export default Result;