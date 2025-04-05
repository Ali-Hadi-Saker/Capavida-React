import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, getAuthHeader, handleAuthResponse, getUser } from '../../utils/auth';
import './style.css';

const Internships = () => {
    const [matchedInternships, setMatchedInternships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [enrollingId, setEnrollingId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/login');
            return;
        }
        fetchInternships();
    }, [navigate]);

    const fetchInternships = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/internship', {
                headers: {
                    ...getAuthHeader()
                }
            });
            
            if (handleAuthResponse(response, navigate)) {
                return;
            }

            if (!response.ok) {
                throw new Error('Failed to fetch internships');
            }

            const data = await response.json();
            findMatchedInternships(data);
            setError(null);
        } catch (err) {
            setError('Failed to load internships. Please try again later.');
            console.error('Error fetching internships:', err);
        } finally {
            setLoading(false);
        }
    };

    const findMatchedInternships = (internshipsData) => {
        const user = getUser();
        
        const userDisabilities = user.disabilityTypes;

        // Filter internships that match user's disabilities
        const matched = internshipsData.filter(internship => 
            internship.disabilityType.some(disability => 
                userDisabilities.includes(disability)
            )
        );

        setMatchedInternships(matched);
    };

    const handleEnroll = async (internshipId) => {
        setEnrollingId(internshipId);
        try {
            const response = await fetch(`http://localhost:5000/api/internship/${internshipId}/enroll`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeader()
                }
            });

            if (handleAuthResponse(response, navigate)) {
                return;
            }

            const data = await response.json();
            console.log(data);

            if (!response.ok) {
                throw new Error(data.error );
            }

            await fetchInternships();
            alert('Successfully enrolled in internship!');
        } catch (err) {
            console.error('Error enrolling in internship:', err);
            const errorMessage = err.message || 'Failed to enroll in internship. Please try again.';
            setError(errorMessage);
            alert(errorMessage);
        } finally {
            setEnrollingId(null);
        }
    };

    if (loading) {
        return (
            <div className="internships-container">
                <div className="loading-message">Loading internships...</div>
            </div>
        );
    }

    return (
        <div className="internships-container">
            <h1 className="internships-title">Available Internships</h1>
            
            {matchedInternships.length > 0 && (
                <>
                    <div className="internships-grid">
                        {matchedInternships.map((internship) => (
                            <div key={internship._id} className="internship-card recommended">
                                <h2 className="position">{internship.title}</h2>
                                <div className="skill-type">
                                    <i className="fa fa-briefcase"></i> {internship.skillType}
                                </div>
                                <p className="location">
                                    <i className="fa fa-location-dot"></i> {internship.location}
                                </p>
                                <p className="duration">
                                    <i className="fa fa-calendar"></i> {internship.duration}
                                </p>
                                <p className="description">{internship.description}</p>
                                <div className="disability-types">
                                    <h4>Suitable for:</h4>
                                    <div className="tags">
                                        {internship.disabilityType.map((disability, index) => (
                                            <span key={index} className="tag">{disability}</span>
                                        ))}
                                    </div>
                                </div>
                                {internship.reviews && internship.reviews.length > 0 && (
                                    <div className="reviews-summary">
                                        <i className="fa fa-star"></i>
                                        {(internship.reviews.reduce((acc, review) => acc + review.rating, 0) / internship.reviews.length).toFixed(1)}
                                        <span className="review-count">({internship.reviews.length} reviews)</span>
                                    </div>
                                )}
                                {internship.pdfCourses && internship.pdfCourses.length > 0 && (
                                    <div className="courses-available">
                                        <i className="fa fa-book"></i> {internship.pdfCourses.length} Course{internship.pdfCourses.length > 1 ? 's' : ''} Available
                                    </div>
                                )}
                                <button 
                                    className={`enroll-btn ${internship.isEnrolled ? 'enrolled' : ''} ${enrollingId === internship._id ? 'loading' : ''}`}
                                    onClick={() => handleEnroll(internship._id)}
                                    disabled={enrollingId === internship._id || internship.isEnrolled}
                                >
                                    {enrollingId === internship._id ? (
                                        <span className="loading-spinner"></span>
                                    ) : internship.isEnrolled ? (
                                        'Enrolled'
                                    ) : (
                                        'Enroll Now'
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            )}
            <button className="dashboard-btn" onClick={() => navigate('/home')} title="Go to Dashboard">
                <i className="fa fa-arrow-right"></i>
            </button>
        </div>
    );
};

export default Internships;