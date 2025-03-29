import './style.css';
import { useState } from 'react';


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSideBar = () => setIsOpen(!isOpen);
    return(
        <nav className='navbar flex'>
                <ul className='nav-list flex'>
                    <li><i className="fa fa-bars" aria-hidden="true"></i></li>
                    <li>Dashboard</li>
                    <li><i className="fa fa-bell" aria-hidden="true"></i></li>
                </ul>
            </nav>
    );
};

export default Navbar;