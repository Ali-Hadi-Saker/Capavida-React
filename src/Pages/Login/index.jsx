import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './style.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically make an API call to validate credentials
        // For now, we'll just simulate a successful login
        if (email && password) {
            // Assuming the user is an intern
            navigate('/internships');
        }
    };

    return(
        <div className="flex column page center">
            <h1 className='green-text'>Intern Sign-in</h1>
            <form onSubmit={handleSubmit} className="flex column center auth-box">
                <input 
                    type="email" 
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input 
                    type="password" 
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
                <p className="login-link black-text">don't have an account{" "}
                    <Link to="/">Sign-up here</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;