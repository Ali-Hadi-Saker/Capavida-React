import Sidebar from '../Sidebar';
import './style.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => setIsOpen(!isOpen);
    
    return (
        <nav className='navbar'>
            <div className='navbar-content'>
                <div className='navbar-left'>
                    <button className="menu-button" onClick={toggleSidebar}>
                        <i className="fa fa-bars"></i>
                    </button>
                    <Link to="/" className="nav-brand">CapaVida</Link>
                </div>
                <div className='navbar-right'>
                    <button className="nav-button">
                        <i className="fa fa-bell"></i>
                    </button>
                </div>
            </div>
            <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar}/>
        </nav>
    );
};

export default Navbar;