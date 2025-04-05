import { useState, useRef, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './style.css';

const Register = () => {
    const { role } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        disabilityCardCode: '',
        disabilityTypes: [],
        jobInterest: '',
        password: '',
        confirmPassword: ''
    });

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const disabilities = [
        "Autism", "ADHD", "Blind", "Down Syndrome", "Dyslexia", "Mute", 
        "Fetal Alcohol", "Dyscalculia", "Amputate", "Syndrome", "APD", 
        "Narcolepsy", "Fragile X", "Deaf", "Other"
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const toggleDisability = (disability) => {
        setFormData(prev => {
            const updatedDisabilities = prev.disabilityTypes.includes(disability)
                ? prev.disabilityTypes.filter(d => d !== disability)
                : [...prev.disabilityTypes, disability];
            return {
                ...prev,
                disabilityTypes: updatedDisabilities
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.disabilityTypes.length === 0) {
            alert('Please select at least one disability');
            return;
        }
        // Add your registration logic here
        console.log(formData);
    };

    return(
        <div className="flex column page center">
            <h1 className='green-text'>Intern Sign-up</h1>
            <form onSubmit={handleSubmit} className="flex column center auth-box">
                <input 
                    type="text" 
                    placeholder="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
                <input 
                    type="text" 
                    placeholder="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
                <input 
                    type="email" 
                    placeholder="Email Address"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input 
                    type="text" 
                    placeholder="Disability Card Code"
                    name="disabilityCardCode"
                    value={formData.disabilityCardCode}
                    onChange={handleChange}
                    required
                />
                <div className="custom-select" ref={dropdownRef}>
                    <div 
                        className="select-header" 
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {formData.disabilityTypes.length === 0 
                            ? "Select Disabilities" 
                            : `Selected: ${formData.disabilityTypes.length}`}
                        <span className={`arrow ${isOpen ? 'up' : 'down'}`}></span>
                    </div>
                    {isOpen && (
                        <div className="options-container">
                            {disabilities.map((disability, index) => (
                                <div 
                                    key={index} 
                                    className={`option ${formData.disabilityTypes.includes(disability) ? 'selected' : ''}`}
                                    onClick={() => toggleDisability(disability)}
                                >
                                    <span className="checkbox">
                                        {formData.disabilityTypes.includes(disability) && '✓'}
                                    </span>
                                    {disability}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <input 
                    type="text" 
                    placeholder="Job Interest"
                    name="jobInterest"
                    value={formData.jobInterest}
                    onChange={handleChange}
                    required
                />
                <input 
                    type="password" 
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <input 
                    type="password" 
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Submit</button>
                <p className="login-link black-text">already have an account{"  "}
                    <Link to="/login">login here</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;