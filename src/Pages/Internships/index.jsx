import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, getAuthHeader, handleAuthResponse, getUser } from '../../utils/auth';
import InternshipCard from '../../Components/InternshipCard';
import './style.css';

const Internships = () => {
    const [matchedInternships, setMatchedInternships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [enrollingId, setEnrollingId] = useState(null);
    const [enrolledInternships, setEnrolledInternships] = useState([]);
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
        try {
            setEnrollingId(internshipId);
            const response = await fetch(`http://localhost:5000/api/internship/${internshipId}/enroll`, {
                method: 'POST',
                headers: {
                    ...getAuthHeader()
                }
            });

            if (handleAuthResponse(response, navigate)) {
                return;
            }

            if (!response.ok) {
                throw new Error('Failed to enroll in internship');
            }

            // Update the enrolled internships state
            setEnrolledInternships(prev => [...prev, internshipId]);
            
            // Refresh the internships list
            fetchInternships();
        } catch (err) {
            console.error('Error enrolling in internship:', err);
            setError('Failed to enroll in internship. Please try again later.');
        } finally {
            setEnrollingId(null);
        }
    };

    if (loading) {
        return (
            <div className="internships-container">
                <div className="loading-message">Loading internships...</div>
                <button className="dashboard-btn" onClick={() => navigate('/Home')}>
                    <i className="fa fa-arrow-right"></i>Dashboard
                </button>
            </div>
        );
    }

   

    return (
        <div className="internships-container">
            <h1 className="internships-title">Available Internships</h1>
            
            {matchedInternships.length > 0 ? (
                <div className="internships-grid">
                    {matchedInternships.map((internship) => (
                        <InternshipCard
                            key={internship._id}
                            internship={internship}
                            onEnroll={handleEnroll}
                            isEnrolled={enrolledInternships.includes(internship._id)}
                            isEnrolling={enrollingId === internship._id}
                        />
                    ))}
                </div>
            ) : (
                <div className="no-internships-message">
                    No internships available that match your profile.
                </div>
            )}
            <button className="dashboard-btn" onClick={() => navigate('/Home')}>
                <i className="fa fa-arrow-right"></i>Dashboard
            </button>
        </div>
    );
};

export default Internships;