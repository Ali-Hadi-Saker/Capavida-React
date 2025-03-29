import './style.css';

const Navbar = () => {
    return(
        <nav className='navbar flex'>
                <ul className='nav-list flex'>
                    <li>Menu</li>
                    <li>Dashboard</li>
                    <li>Notification</li>
                </ul>
            </nav>
    );
};

export default Navbar;