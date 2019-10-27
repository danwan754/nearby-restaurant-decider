import React from 'react';
import SortReview from './SortReview';
import Star from '../assets/star.png';

class ResultDetail extends React.Component {

    constructor() {
        super();
        this.renderStars = this.renderStars.bind(this);
    }

    renderStars(length) {
        let stars = [];
        for (var i = 0; i < length; i++) {
            stars.push(
                <img key={i}
                    className='star'
                    src={Star} 
                    alt={'no image'}>
                </img>
            );
        }
        return stars;
    }

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
        return (
            <div className="result-detail-container">
                <div className="side-result-container left-side">
                    <img id="restaurant-main-img">{  }</img>
                    <p id="restaurant-name">{ place.name }</p>
                    <div className="contact-hours-photo-container">
                        <div id="restaurant-contact">
                            <p>{ place.formatted_address }</p>
                            <p>{ place.formatted_phone_number }</p>
                            <p>{ place.website }</p>
                        </div>
                        <div id="restaurant-hours">{ 
                            place.opening_hours.weekday_text.map( (day, index) => (
                                <p className="day-hours" key={index}>
                                    { day }
                                </p>
                            ))}
                        </div>
                        <div className="gallery">
                            {/* { this.props.result.photos.map(img => ( */}
                                {/* <img src={ img }></img> */}
                            {/* ))} */}
                        </div>
                    </div>
                </div>
                <div className="side-result-container right-side">
                    <div className="reviews-container">
                        <SortReview />
                        { place.reviews.map( (review, index) => (
                            <div className="review" key={index} >
                                <p>{ review.author_name }</p>
                                <div className="rating-time-container">
                                    <span className="star-container">
                                        { this.renderStars(review.rating) }
                                    </span>
                                    <span className="time-description">
                                        { review.relative_time_description }
                                    </span>
                                </div>
                                <p>{ review.text }</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default ResultDetail;