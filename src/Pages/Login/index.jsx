import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setAuth } from '../../utils/auth';
import './style.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            // Save authentication data
            setAuth(data.token, data.user);

            // Redirect based on user role
            if (data.user.role === 'intern') {
                navigate('/internships');
            } else if (data.user.role === 'internship'){
                navigate('/InternshipDash');
            }
            else {
                navigate('/home');
            }
        } catch (err) {
            setError(err.message || 'Failed to login. Please try again.');
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className="flex column page center">
            <h1 className='green-text'>Intern Sign-in</h1>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit} className="flex column center auth-box">
                <input 
                    type="email" 
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                />
                <input 
                    type="password" 
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                />
                <button 
                    type="submit" 
                    disabled={loading}
                    className={loading ? 'loading' : ''}
                >
                    {loading ? (
                        <span className="loading-spinner"></span>
                    ) : (
                        'Login'
                    )}
                </button>
                <p className="login-link black-text">don't have an account{" "}
                    <Link to="/">Sign-up here</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;