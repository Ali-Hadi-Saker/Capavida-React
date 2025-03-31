import Sidebar from '../Sidebar';
import './style.css';
import { useState } from 'react';


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => setIsOpen(!isOpen);
    return(
        <nav className='navbar flex'>
                <ul className='nav-list flex'>
                    <li><i className="fa fa-bars" onClick={toggleSidebar}></i></li>
                    <li>Dashboard</li>
                    <li><i className="fa fa-bell" aria-hidden="true"></i></li>
                </ul>
                <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar}/>
            </nav>
    );
};

export default Navbar;