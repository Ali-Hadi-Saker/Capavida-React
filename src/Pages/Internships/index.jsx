import { useState, useEffect } from "react";
import './style.css';

const Internships = () => {
    const [internships, setInternships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchInternships();
    }, []);

    const fetchInternships = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/internship');
            if (!response.ok) {
                throw new Error('Failed to fetch internships');
            }
            const data = await response.json();
            console.log(data);
            setInternships(data);
            setError(null);
        } catch (err) {
            setError('Failed to load internships. Please try again later.');
            console.error('Error fetching internships:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="internships-container">
                <div className="loading-message">Loading internships...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="internships-container">
                <div className="error-message">{error}</div>
            </div>
        );
    }

    return (
        <div className="internships-container">
            <h1 className="internships-title">Available Internships</h1>
            {internships.length === 0 ? (
                <div className="no-internships-message">No internships available at the moment.</div>
            ) : (
                <div className="internships-grid">
                    {internships.map((internship) => (
                        <div key={internship._id} className="internship-card">
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
                            <button className="apply-btn">Apply Now</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Internships;