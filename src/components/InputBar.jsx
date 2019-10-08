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
        query_data: {
            establishment: 'Restaurant',
            radius: 2000,
            postal_code: '',
            country_code: 'ca'
        }
    }

    constructor() {
        super();
        this.handleSelect = this.handleSelect.bind(this);
        this.handleRadiusInput = this.handleRadiusInput.bind(this);
        this.handlePostalCodeInput = this.handlePostalCodeInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isPostalCodeFormat = this.isPostalCodeFormat.bind(this);
    }

    // handles establishment selection
    handleSelect(establishment) {
        let query_data = this.state.query_data;
        query_data.establishment = establishment;
        this.setState({query_data: query_data});
    }

    handleRadiusInput(integer) {
        let query_data = this.state.query_data;
        query_data.radius = integer;
        this.setState({query_data: query_data});
    }

    handlePostalCodeInput(postalCode) {
        let query_data = this.state.query_data;
        query_data.postal_code = postalCode;
        this.setState({query_data: query_data});
    }

    handleSubmit() {
        if (this.isPostalCodeFormat(this.state.query_data.postal_code)) {
            this.props.onSubmit(this.state.query_data);

            // fetch nearby establishments
            // const result = getNearbyEstablishments(this.state.query_data);
            // if (result.status==OK): <Redirect to='/result' result=result />
        }
        else {
            // display error message
        }
    }

    isPostalCodeFormat(postal_code) {
        if (postal_code.length === 6) {
            if (/[A-Za-z][0-9][A-Za-z][0-9][A-Za-z][0-9]/.test(postal_code)) {
                return true;
            }
            else {
                return false;
            }
         }
         return false;
    }

    render() {
        const input = this.state.query_data;
        return(
            <div>
                <DropDownMenu 
                    establishments={this.state.establishments} 
                    onSelect={this.handleSelect} />
                <InputRadius 
                    value={input.radius} 
                    onInput={this.handleRadiusInput} />
                <InputPostalCode 
                    value={input.postal_code}
                    onInput={this.handlePostalCodeInput} />
                <input 
                    className={this.props.submitClassName ? this.props.submitClassName: 'inlineSubmit'}
                    type="submit" 
                    onClick={this.handleSubmit} />
            </div>
        );
    }
}

export default InputBar;