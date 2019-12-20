import React from 'react';

import country from '../assets/canada.png';

class InputCountry extends React.Component {

    render() {
        return (
            <div className="country-container">
                <img 
                    className="country-img"
                    src={ country }
                    alt="N/A">
                </img>
            </div>
        )
    }
}

export default InputCountry;