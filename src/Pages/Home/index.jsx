import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, getAuthHeader, handleAuthResponse } from '../../utils/auth';
import Navbar from "../../Components/Navbar";
import "./style.css";

const Home = () => {
    const [question, setQuestion] = useState("");
    const [response, setResponse] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [history, setHistory] = useState([]);
    const [fontSize, setFontSize] = useState("medium");
    const [highContrast, setHighContrast] = useState(false);
    const inputRef = useRef(null);
    const [enrolledInternships, setEnrolledInternships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/login');
            return;
        }
        fetchEnrolledInternships();
    }, [navigate]);

    const fetchEnrolledInternships = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/internship/enrolled/me', {
                headers: {
                    ...getAuthHeader()
                }
            });

            if (handleAuthResponse(response, navigate)) {
                return;
            }

            if (!response.ok) {
                throw new Error('Failed to fetch enrolled internships');
            }

            const data = await response.json();
            setEnrolledInternships(Array.isArray(data.internships) ? data.internships : []);
            setError(null);
        } catch (err) {
            setError('Failed to load your internships. Please try again later.');
            console.error('Error fetching enrolled internships:', err);
            setEnrolledInternships([]);
        } finally {
            setLoading(false);
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);

    try {
        // This would connect to your actual AI backend
        // Replace with your actual API call
        // const responseData = await yourActualAPICall(question);

        // Placeholder for demonstration
        const responseData =
        "This is where the response from your AI API would appear.";
        setResponse(responseData);

        // Add to history
        setHistory((prev) => [
        {
            question,
            response: responseData,
            timestamp: new Date().toISOString(),
        },
        ...prev,
        ]);
    } catch (error) {
        setResponse("Sorry, I couldn't process your request. Please try again.");
        console.error("Error fetching AI response:", error);
    } finally {
        setIsLoading(false);
    }
    };

    // Load previous conversation
    const loadConversation = (index) => {
    const item = history[index];
    setQuestion(item.question);
    setResponse(item.response);
    };

    // Handle font size changes
    const changeFontSize = (size) => {
    setFontSize(size);
    };

    // Apply theme classes based on settings
    const getThemeClasses = () => {
    let classes = `font-size-${fontSize}`;
    if (highContrast) classes += " high-contrast";
    return classes;
    };

    const handleStartCourse = (internshipId) => {
        // TODO: Implement course starting functionality
        console.log('Starting course for internship:', internshipId);
    };

    const handleViewDetails = (internshipId) => {
        // TODO: Navigate to internship details page
        console.log('Viewing details for internship:', internshipId);
    };

    const renderEnrolledInternshipCard = (internship) => (
        <div key={internship._id} className="enrolled-internship-card">
            <div className="internship-header">
                <h3 className="internship-title">{internship.title}</h3>
                <span className="skill-badge">{internship.skillType}</span>
            </div>
            <div className="internship-details">
                <p className="location">
                    <i className="fa fa-location-dot"></i> {internship.location}
                </p>
                <p className="duration">
                    <i className="fa fa-calendar"></i> {internship.duration}
                </p>
            </div>
            {internship.pdfCourses && internship.pdfCourses.length > 0 && (
                <div className="course-progress">
                    <h4>Course Progress</h4>
                    <div className="progress-bar">
                        <div 
                            className="progress-fill" 
                            style={{ width: `${(internship.completedCourses || 0) / internship.pdfCourses.length * 100}%` }}
                        ></div>
                    </div>
                    <span className="progress-text">
                        {internship.completedCourses || 0}/{internship.pdfCourses.length} Courses Completed
                    </span>
                </div>
            )}
            <div className="action-buttons">
                <button 
                    className="view-details-btn"
                    onClick={() => handleViewDetails(internship._id)}
                >
                    View Details
                </button>
                {internship.pdfCourses && internship.pdfCourses.length > 0 && (
                    <button 
                        className="start-course-btn"
                        onClick={() => handleStartCourse(internship._id)}
                    >
                        <i className="fa fa-book"></i> Continue Learning
                    </button>
                )}
            </div>
        </div>
    );

    return (
    <>
        <h1 >Home page</h1>
        
        <div className='flex column'>
            <section className="question-section" aria-labelledby="question-heading">
            <form onSubmit={handleSubmit} className="question-form">
                <div className="input-group">
                <label htmlFor="question-input" className="sr-only">
                    Your question
                </label>
                <input
                    id="question-input"
                    ref={inputRef}
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask AI..."
                    className="question-input"
                    aria-describedby="input-hint"
                    autoComplete="off"
                />
                </div>
            </form>
            </section>

            <section className="response-section" aria-labelledby="response-heading">

            <div
                className="response-content"
                aria-live="polite"
                aria-atomic="true"
                tabIndex={0}
            >
                {isLoading ? (
                <div className="loading-indicator" aria-label="Loading response">
                    <p>Processing your question...</p>
                </div>
                ) : response ? (
                <div className="response-text">{response}</div>
                ) : (
                <p className="placeholder-text">Your response will appear here</p>
                )}
            </div>
            </section>
            <h3>Your Enrolled Internships</h3>
            <section className='internships-section'>
                {loading ? (
                    <div className="loading-message">Loading your internships...</div>
                ) : error ? (
                    <div className="error-message">{error}</div>
                ) : enrolledInternships.length === 0 ? (
                    <div className="no-internships-message">
                        <p>You haven't enrolled in any internships yet.</p>
                        <button 
                            className="browse-btn" 
                            onClick={() => navigate('/internships')}
                        >
                            Browse Internships
                        </button>
                    </div>
                ) : (
                    <div className="enrolled-internships-grid">
                        {enrolledInternships.map(renderEnrolledInternshipCard)}
                    </div>
                )}
            </section>
            <h3>Your Marketplace</h3>
            <section className='internships-section'>
            </section>
        </div>
    </>
    );
};

export default Home;
