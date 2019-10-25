import React from 'react';

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
        return (
            <div className="result-detail-container">
                <div className="side-result-container">
                    <img id="restaurant-main-img">{  }</img>
                    <div className="result-text-content">
                        <p id="restaurant-name">{ place.name }</p>
                        <div id="restaurant-contact">
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
                <div className="side-result-container">
                    <div className="result-text-content">
                        <div className="reviews-container">
                            {/* <SortReviews /> */}
                            { place.reviews.map( (review, index) => (
                                <div className="review" key={index} >
                                    <span>{ review.author_name }</span>
                                    <span>  { review.rating }</span>
                                    <p>{ review.relative_time_description }</p>
                                    <p>{ review.text }</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default ResultDetail;