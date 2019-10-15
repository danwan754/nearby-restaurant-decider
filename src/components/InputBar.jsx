import React from 'react';

import DropDownMenu from './DropDownMenu';
import InputRadius from './InputRadius';
import InputPostalCode from './InputPostalCode';
import InputCountry from './InputCountry';

import '../css/InputStyles.css';


class InputBar extends React.Component {

    state = {
        establishments: [
            'Restaurant',
            'Cafe',
            'Bakery',
            'Bar'
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

    componentDidMount() {
        // change initial values in query_data if queried from Home page
        if (this.props.query_data) {
            this.setState({ query_data: this.props.query_data });
            // this.handleSubmit();
        }
        // console.log("componentDidmount at InputBar");
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
        }
        else {
            // display error message
            console.log("invalid postal code");
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
            <div className="input-bar" >
                <div className="sub-input-bar">
                    <div className="inline">
                        <DropDownMenu
                            establishments={this.state.establishments} 
                            onSelect={this.handleSelect} />
                    </div>
                    <div className="inline" >
                        <InputRadius
                            value={input.radius} 
                            onInput={this.handleRadiusInput} />
                    </div>
                    <div className="inline" >
                        <InputPostalCode
                            value={input.postal_code}
                            onInput={this.handlePostalCodeInput} />
                    </div>
                    <div className="">
                        <InputCountry
                            value={ input.country_code } />
                    </div>
                </div>
                <input 
                    className={this.props.submitClassName ? this.props.submitClassName : "input-submit inline" }
                    type="submit"
                    value="Find" 
                    onClick={this.handleSubmit} />
            </div>
        );
    }
}

export default InputBar;