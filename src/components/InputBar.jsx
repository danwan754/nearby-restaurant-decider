import React from 'react';

import DropDownMenu from './DropDownMenu';
import InputRadius from './InputRadius';
// import InputPostalCode from './InputPostalCode';


class InputBar extends React.Component {

    state = {
        establishments: [
            'Restaurant',
            'Cafe',
            'Bakery'
        ],
        establishment: 'Restaurant',
        radius: 2000,
        postal_code: null,
        country_code: 'ca'
    }

    constructor() {
        super();
        this.handleSelect = this.handleSelect.bind(this);
        this.handleRadiusInput = this.handleRadiusInput.bind(this);
        this.handlePostalCodeInput = this.handlePostalCodeInput.bind(this);
    }

    // handles establishment selection
    handleSelect(establishment) {
        this.setState({establishment: establishment});
    }

    handleRadiusInput(integer) {
        this.setState({radius: integer});
    }

    handlePostalCodeInput(postalCode) {
        this.setState({postal_code: postalCode});
    }

    render() {
        return(
            <div>
                <h3>blah</h3>
                <DropDownMenu establishments={this.state.establishments} onSelect={this.handleSelect} />
                <InputRadius radius={this.state.radius} onRadiusInput={this.handleRadiusInput} />
                {/* <InputPostalCode onPostalInput={this.handlePostalCodeInput} /> */}
            </div>
        )
    }
}

export default InputBar;