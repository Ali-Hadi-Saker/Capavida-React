import Sidebar from '../Sidebar';
import BrightnessControl from '../BrightnessControl';
import './style.css';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const toggleSidebar = () => setIsOpen(!isOpen);
    
    const getPageName = () => {
        const path = location.pathname;
        if (path === '/' || path === '/home') return 'Dashboard';
        if (path === '/profile') return 'Profile';
        if (path === '/community') return 'Community';
        if (path === '/marketplace') return 'Marketplace';
        if (path === '/internships') return 'Internships';
        if (path === '/help-center') return 'Help Center';
        return 'Dashboard';
    };

    return (
        <nav className='navbar'>
            <div className='navbar-content'>
                <div className='navbar-left'>
                    <button className="menu-button" onClick={toggleSidebar}>
                        <i className="fa fa-bars"></i>
                    </button>
                    <Link to="/" className="nav-brand">CapaVida</Link>
                    <span className="page-name">{getPageName()}</span>
                </div>
                <div className='navbar-right'>
                    <BrightnessControl />
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