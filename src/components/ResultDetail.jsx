import React from 'react';

import Gallery from './Gallery';
import Review from './Review';


class ResultDetail extends React.Component {

    render() {
        if (Object.keys(this.props.place).length === 0) {
            console.log("No results");
            return (
                <div>
                    No results.
                </div>
            );
        }

        const place = this.props.place;
        const addressComponents = place.formatted_address.split(', ');
        const streetAddress = addressComponents[0];
        const remainderAddress = addressComponents.slice(1,3).join(', ');

        return (
            <div className="result-detail-container">
                <div className="result-detail-container-table">
                    <div className="side-result-container left-side">
                        <img id="restaurant-main-img">{  }</img>
                        <p id="restaurant-name">{ place.name }</p>
                        <div className="contact-hours-photo-container">
                            <div className="contact-hours-container">
                                <div id="restaurant-contact">
                                    <p>
                                        { streetAddress }
                                        <br />
                                        { remainderAddress }
                                    </p>
                                    {/* <p className="address">{ remainderAddress }</p> */}
                                    <p>{ place.formatted_phone_number }</p>
                                    <p>{ place.website }</p>
                                </div>
                                <div id="restaurant-hours">{ 
                                    place.opening_hours.weekday_text.map( (day, index) => (
                                        <p key={index}>
                                            { day }
                                        </p>
                                    ))}
                                </div>
                            </div>
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