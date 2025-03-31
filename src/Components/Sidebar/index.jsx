import { Link } from 'react-router-dom';
import './style.css';


const Sidebar = ({isOpen, toggleSidebar})=> {
    return(
        <>
            <div className={`sidebar ${isOpen ? "open" : ""}`}>
            <button className='close-btn' onClick={toggleSidebar}>X</button>
            <ul className='sidebar-menu'>
                <li><Link to="/home" onClick={toggleSidebar} className="sidebar-link">Dashboard</Link></li>
                <li><Link to="/profile" onClick={toggleSidebar} className="sidebar-link">Profile</Link></li>
                <li><Link to="/community" onClick={toggleSidebar} className="sidebar-link">Community</Link></li>
                <li><Link to="/marketplace" onClick={toggleSidebar} className="sidebar-link">Marketplace</Link></li>
                <li><Link to="/internships" onClick={toggleSidebar} className="sidebar-link">Internships</Link></li>
                <li><Link to="/help-center" onClick={toggleSidebar} className="sidebar-link">Help Center</Link></li>
            </ul>
        </div>
        </>
    )
}

export default Sidebar;