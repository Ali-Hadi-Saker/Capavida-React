import './style.css';

const Sidebar = ({isOpen, toggleSidebar})=> {
    return(
        <>
            <div className={`sidebar ${isOpen ? "open" : ""}`}>
            <button className='close-btn' onClick={toggleSidebar}>X</button>
            <ul className='sidebar-menu'>
                <li>Dashboard</li>
                <li>Profile</li>
                <li>Community</li>
                <li>Marketplace</li>
                <li>Internships</li>
                <li>Help Center</li>
            </ul>
        </div>
        </>
    )
}

export default Sidebar;