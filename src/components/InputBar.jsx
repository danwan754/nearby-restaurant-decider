import React from 'react';

import DropDownMenu from './DropDownMenu';
import InputRadius from './InputRadius';
import InputPostalCode from './InputPostalCode';


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
        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleSubmit() {
        
    }

    render() {
        return(
            <div>
                <DropDownMenu establishments={this.state.establishments} onSelect={this.handleSelect} />
                <InputRadius radius={this.state.radius} onInput={this.handleRadiusInput} />
                <InputPostalCode onInput={this.handlePostalCodeInput} />
                <input type="submit" onClick={this.handleSubmit} />
            </div>
        )
    }
}

export default InputBar;