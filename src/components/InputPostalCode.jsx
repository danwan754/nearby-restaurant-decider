import React from 'react';

class InputPostalCode extends React.Component {

    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        this.props.onInput(document.getElementById("inputPostalCode").value);
    }

    render() {
        return (
            <div>
                <input 
                    id="inputPostalCode" 
                    type="text"
                    onChange={this.handleChange} 
                    maxLength="6" 
                    value={this.props.value} />
            </div>
        )
    }
}

export default InputPostalCode;