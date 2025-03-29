import './style.css';

const Sidebar = ({isOpen, toggleSideBar})=> {
    return(
        <div className='sidebar'>
            <button className='close-btn'>X</button>
            <ul className='sidebar-menu'>
                <li>Dashboard</li>
                <li>Profile</li>
                <li>Community</li>
                <li>Marketplace</li>
                <li>Internships</li>
                <li>Help Center</li>
            </ul>
        </div>
    )
}

export default Sidebar;