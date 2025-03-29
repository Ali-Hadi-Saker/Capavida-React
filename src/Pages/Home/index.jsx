import './style.css';

const Home = () => {
    return(
        <div>
            <h1>Home page</h1>
            <nav className='flex navbar'>
                <ul>
                    <li>Menu</li>
                    <li>Dashboard</li>
                    <li>Notification</li>
                </ul>
            </nav>
        </div>
    )
}

export default Home;