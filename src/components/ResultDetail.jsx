import React from 'react';

class ResultDetail extends React.Component {

    render() {
        if (!this.props.result) {
            console.log("No results");
            return (
                <div>
                    No results.
                </div>
            );
        }
        return (
            <div>
                <div className="left-side-result-container">
                    <img id="restaurant-main-img">{ this.props.result.mainImg }</img>
                    <p id="restaurant-name">{ this.props.result.name }</p>
                    <p id="restaurant-details">
                        { this.props.result.hours }
                        { this.props.result.contact }
                    </p>
                    <div className="gallery">
                        { this.props.result.photos.map(img => (
                            <img src={ img }></img>
                        ))}
                    </div>
                </div>
                <div className="right-side-result-container">
                    <div className="reviews-container">
                        {/* <SortReviews /> */}
                        { this.props.result.reviews.map(review => (
                            <div className="review">
                                { review.author }
                                { review.rating }
                                { review.comment }
                            </div>
                        ))}
                    </div>
                </div>
                
            </div>
        )
    }
}

export default ResultDetail;