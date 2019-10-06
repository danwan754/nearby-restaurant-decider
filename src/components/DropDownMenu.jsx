import React from 'react';

class DropDownMenu extends React.Component {


    constructor() {
        super();
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect() {
        this.props.onSelect(document.getElementById("dropdown-menu-establishment").value);
    }

    render() {
        return (
            <div>
                <select id="dropdown-menu-establishment" onChange={this.handleSelect}>
                    {this.props.establishments.map(establishment => ( 
                        <option key={establishment}>{establishment}</option> 
                    ))}
                </select>
            </div>
        );
    }
}

export default DropDownMenu;