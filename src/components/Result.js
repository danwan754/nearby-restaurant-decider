import React from 'react';

import InputBar from './InputBar';
import ResultDetail from './ResultDetail';

import '../css/Result.css';

class Result extends React.Component {

    state = {
        placeIDs: [],
        currentPlaceID: '',
        place: {},
        isLoading: false
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
        const placeIDs = this.state.placeIDs.filter(place => place != this.state.currentPlaceID);
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
                {/* <ResultDetail 
                    place={this.state.place}
                    onSubmit={this.handleSkip} /> */}
                { this.state.isLoading ? "Loading ..." : (
                    <div>
                        <div>{ this.state.placeIDs.length > 0 ? this.state.placeIDs : 'nothing' }</div>
                        <div>{ this.state.currentPlaceID ? this.state.currentPlaceID : 'nothing' }</div>
                        <div>{ Object.keys(this.state.place).length > 0 ? JSON.stringify(this.state.place) : 'nothing' }</div>
                    </div> 
                )}  
            </div>
        );
    }
}

export default Result;