import './style.css';
import { Link } from 'react-router-dom';

const Register = () => {
    return(
        <div className="flex column page center">
            <h1>Register page</h1>
            <div className="flex column center auth-box">
                <input type="text" placeholder="First Name"/>
                <input type="text" placeholder="Last Name"/>
                <input type="text" placeholder="Email Adress"/>
                <input type="text" placeholder="Disability Card Code"/>
                <input type="text" placeholder="Disability"/>
                <input type="text" placeholder="Job Interest"/>
                <input type="password" placeholder="Password"/>
                <input type="password" placeholder="Confirm Password"/>
                <button>Submit</button>
                <p className="login-link">already have an account{"  "}
                <Link to="/login">login here</Link>
                </p>
            </div>
        </div>
    )
}

export default Register