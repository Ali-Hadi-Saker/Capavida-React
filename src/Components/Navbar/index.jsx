import Sidebar from '../Sidebar';
import BrightnessControl from '../BrightnessControl';
import './style.css';
import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { clearAuth } from '../../utils/auth';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();
    const toggleSidebar = () => setIsOpen(!isOpen);
    
    const getPageName = () => {
        const path = location.pathname;
        if (path === '/' || path === '/home') return 'Dashboard';
        if (path === '/profile') return 'Profile';
        if (path === '/community') return 'Community';
        if (path === '/marketplace') return 'Marketplace';
        if (path === '/categories') return 'Internships';
        if (path === '/help-center') return 'Help Center';
        return 'Dashboard';
    };

    const handleLogout = () => {
        clearAuth();
        navigate('/login');
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <nav className='navbar'>
            <div className='navbar-content'>
                <div className='navbar-left'>
                    <button className="menu-button" onClick={toggleSidebar}>
                        <i className="fa fa-bars"></i>
                    </button>
                    <span className="nav-brand">CapaVida</span>
                    <span className="page-name">{getPageName()}</span>
                </div>
                <div className='navbar-right'>
                    <BrightnessControl />
                    <div className="notification-container" ref={dropdownRef}>
                        <button 
                            className="nav-button" 
                            onClick={() => setShowDropdown(!showDropdown)}
                        >
                            <i className="fa fa-bell"></i>
                        </button>
                        {showDropdown && (
                            <div className="notification-dropdown">
                                <div className="dropdown-item" onClick={handleLogout}>
                                    <i className="fa fa-sign-out"></i>
                                    <span>Logout</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar}/>
        </nav>
    );
};

export default Navbar;