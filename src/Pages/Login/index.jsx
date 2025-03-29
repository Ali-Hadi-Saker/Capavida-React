import { Link } from "react-router-dom";
import './style.css';

const Login = () => {
    return(
        <div className="flex column page center">
            <h1 className='green-text'>Intern Sign-up</h1>
            <div className="flex column center auth-box">
                <input type="text" placeholder="Email Adress"/>
                <input type="password" placeholder="Password"/>
                <button>Submit</button>
                <p className="login-link black-text">dont have an account{"  "}
                <Link to="/">Sign-up here</Link>
                </p>
            </div>
        </div>
    )
}

export default Login