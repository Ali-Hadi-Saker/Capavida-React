import './style.css';


const Navbar = () => {
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