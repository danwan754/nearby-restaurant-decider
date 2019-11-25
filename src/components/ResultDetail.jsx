import React from 'react';

import Gallery from './Gallery';
import Review from './Review';


class ResultDetail extends React.Component {

    render() {
        if (Object.keys(this.props.place).length === 0) {
            return (
                <div>
                    No results found for your area. If possible, try again with a bigger radius.
                </div>
            );
        }

        const place = this.props.place;
        const addressComponents = place.formatted_address.split(', ');
        const streetAddress = addressComponents[0];
        const remainderAddress = addressComponents.slice(1,3).join(', ');
        const openHours = place.opening_hours;
        const encodedValue = encodeURIComponent(place.formatted_address);
        const embeddedMapURL = 'https://maps.google.com/maps?output=embed&width=80%&height=200&hl=en&ie=UTF8&t=m&z=16&iwloc=J&q=' + encodedValue;

        return (
            <div className="result-detail-container">
                <div className="result-detail-container-table">
                    <div className="side-result-container left-side">
                        <div id="main-img-container">
                            <img id="main-img" src={ this.props.mainPhotoURL } alt="N/A" />
                        </div>
                        <p id="restaurant-name">{ place.name }</p>
                        <div className="contact-hours-photo-container">
                            <div className="contact-hours-container">
                                <div id="restaurant-contact">
                                    <p>
                                        { streetAddress }
                                        <br />
                                        { remainderAddress }
                                    </p>
                                    <p>{ place.formatted_phone_number }</p>
                                    <a href={ place.website } target="_blank" rel="noopener noreferrer">{ place.website }</a>
                                </div>
                                <div id="restaurant-hours">{ 
                                    openHours && openHours.weekday_text ?
                                        openHours.weekday_text.map( (day, index) => (
                                            <p key={index}>
                                                { day }
                                            </p>
                                        )) : ''
                                }
                                </div>
                            </div>
                            <iframe 
                                title='GoogleEmbeddedMap'
                                src={ embeddedMapURL }
                                width='90%' height='200px'>
                            </iframe>
                            <Gallery photoIDs={this.props.photoIDs} />
                        </div>
                    </div>
                    <div className="side-result-container right-side">
                        <Review reviews={ place.reviews } />
                    </div>
                </div>
            </div>
        )
    }
}

export default ResultDetail;