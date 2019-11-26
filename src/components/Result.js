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
        currentPlaceID: '',
        photoIDs: [],
        place: {}
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