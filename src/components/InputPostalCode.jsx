import React from 'react';

class InputPostalCode extends React.Component {

    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        this.props.onInput(document.getElementById("inputPostalCode").value);

        // const value = document.getElementById("inputPostalCode").value;
        // if (value.length == 6) {
        //     if (/[A-Za-z][0-9][A-Za-z][0-9][A-Za-z][0-9]/.test(value)) {
        //         this.props.onInput(value);
        //  }
        // }
    }

    render() {
        return (
            <div>
                <input id="inputPostalCode" onChange={this.handleChange} type="text" maxLength="6"></input>
            </div>
        )
    }
}

export default InputPostalCode;