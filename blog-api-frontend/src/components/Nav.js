import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

function Nav() {
    return(
        <nav>
            <div className='heading'><h1>Blogs Website</h1></div>
            <ul className='nav-links'>
                <Link to='/'><li className='App-link'>Home</li></Link>
                <Link to='/register'><li className='App-link'>Register</li></Link>
                <Link to='/login'><li className='App-link'>Login</li></Link>
            </ul>
        </nav>
        
        
    )
}

export default React.memo(Nav);