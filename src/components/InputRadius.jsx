import React from 'react';

class InputRadius extends React.Component {

    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        this.props.onInput(document.getElementById("input-radius").value);
    }

    render() {
        return (
            <div>
                <input 
                    id="input-radius" 
                    type='number' 
                    min='500' 
                    max='5000'
                    step='500'
                    value={this.props.value} 
                    onChange={this.handleChange} />
            </div>
        )
    }
}

export default InputRadius;