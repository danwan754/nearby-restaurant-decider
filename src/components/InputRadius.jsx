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
                <input id="input-radius" type='number' min='1000' step='1000' value={this.props.radius} onChange={this.handleChange}></input>
            </div>
        )
    }
}

export default InputRadius;