import React from 'react';

import SortReview from './SortReview';
import '../css/Review.css';
import Star from '../assets/star.png';

class Review extends React.Component {

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
                    alt={'Star'}>
                </img>
            );
        }
        return stars;
    }

    render() {
        let reviews = this.props.reviews;
        return (
            <div className="reviews-container">
                <SortReview />
                { reviews.map( (review, index) => (
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
        )
    }
}

export default Review;