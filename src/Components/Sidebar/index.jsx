import { Link } from 'react-router-dom';
import './style.css';

const Sidebar = ({isOpen, toggleSidebar}) => {
    return (
        <>
            <div className={`sidebar-overlay ${isOpen ? "open" : ""}`} onClick={toggleSidebar}></div>
            <div className={`sidebar ${isOpen ? "open" : ""}`}>
                <div className="sidebar-header">
                    <h2 className="sidebar-title">Menu</h2>
                    <button className='close-btn' onClick={toggleSidebar}>
                        <i className="fa fa-times"></i>
                    </button>
                </div>
                <ul className='sidebar-menu'>
                    <li>
                        <Link to="/home" onClick={toggleSidebar} className="sidebar-link">
                            <i className="fa fa-home"></i>
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/profile" onClick={toggleSidebar} className="sidebar-link">
                            <i className="fa fa-user"></i>
                            <span>Profile</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/community" onClick={toggleSidebar} className="sidebar-link">
                            <i className="fa fa-users"></i>
                            <span>Community</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/marketplace" onClick={toggleSidebar} className="sidebar-link">
                            <i className="fa fa-shopping-cart"></i>
                            <span>Marketplace</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/categories" onClick={toggleSidebar} className="sidebar-link">
                            <i className="fa fa-graduation-cap"></i>
                            <span>Internships</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/help" onClick={toggleSidebar} className="sidebar-link">
                            <i className="fa fa-question-circle"></i>
                            <span>Help Center</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Sidebar;