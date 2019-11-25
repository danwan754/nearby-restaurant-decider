import React from 'react';
import { Link } from 'react-router-dom';

import '../css/Nav.css';

class NavBar extends React.Component {
    
    render() {
        return (
            <ul className="navbar">
                {/* <li>
                    <Link className='navLink' to='/about'>About</Link>
                </li> */}
                <li>
                    <Link className='navLink' to='/'>Home</Link>
                </li>
                <li>
                    <Link className='navLink' to="/contact">Contact</Link>
                </li>
            </ul>
        );
    }
}

export default NavBar;