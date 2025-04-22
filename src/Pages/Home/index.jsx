import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, getAuthHeader, handleAuthResponse } from '../../utils/auth';
import "./style.css";
import WhatsAppButton from '../../Components/WhatsAppButton';

const Home = () => {
    const [enrolledInternships, setEnrolledInternships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [question, setQuestion] = useState("");
    const [aiResponse, setAiResponse] = useState("");
    const [isAiLoading, setIsAiLoading] = useState(false);
    const [withdrawingId, setWithdrawingId] = useState(null);
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
            setError('Failed to load internships');
            console.error('Error fetching internships:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchWithdrawInternship = async (internshipId) => {
        if (!internshipId) return;
        
        setWithdrawingId(internshipId);
        setError(null);
        
        try {
            const response = await fetch(`http://localhost:5000/api/internship/${internshipId}/withdraw`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeader()
                }
            });

            if (handleAuthResponse(response, navigate)) {
                return;
            }

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to withdraw from internship');
            }

            // Remove the withdrawn internship from the state
            setEnrolledInternships(prev => prev.filter(internship => internship._id !== internshipId));
            alert('Successfully withdrawn from internship');
            
        } catch (error) {
            setError(error.message || 'Failed to withdraw from internship');
            console.error('Withdrawal error:', error);
            alert(error.message || 'Failed to withdraw from internship');
        } finally {
            setWithdrawingId(null);
        }
    };

    const handleAskAi = async (e) => {
        e.preventDefault();
        if (!question.trim()) return;

        setIsAiLoading(true);
        setAiResponse("");

        try {
            const response = await fetch('http://localhost:5000/api/chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeader()
                },
                body: JSON.stringify({ question: question.trim() })
            });

            if (!response.ok) {
                throw new Error('Failed to get AI response');
            }

            const data = await response.json();
            console.log(data);
            setAiResponse(data.answer);
        } catch (err) {
            setAiResponse("Sorry, I couldn't process your request. Please try again.");
        } finally {
            setIsAiLoading(false);
        }
    };

    const renderEnrolledInternshipCard = (internship) => (
        <div key={internship._id} className="enrolled-internship-card">
            <h3 className="internship-title">{internship.title}</h3>
            <div className="internship-details">
                <p><i className="fa fa-briefcase"></i> {internship.skillType}</p>
                <p><i className="fa fa-location-dot"></i> {internship.location}</p>
                <p><i className="fa fa-calendar"></i> {internship.duration}</p>
            </div>
            <button 
                className={`withdraw-btn ${withdrawingId === internship._id ? 'loading' : ''}`}
                onClick={() => fetchWithdrawInternship(internship._id)}
                disabled={withdrawingId === internship._id}
            >
                {withdrawingId === internship._id ? (
                    <span className="loading-spinner"></span>
                ) : (
                    'Withdraw'
                )}
            </button>
        </div>
    );

    if (loading) return <div className="loading-message">Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="container">
            <section className="ai-section">
                <form onSubmit={handleAskAi}>
                    <div className="ai-input-container">
                        <input
                            type="text"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleAskAi(e)}
                            placeholder="Ask AI anything..."
                            className="ai-input"
                        />
                    </div>
                </form>
                {isAiLoading ? (
                    <div className="ai-loading">Processing your question...</div>
                ) : aiResponse && (
                    <div className="ai-response">{aiResponse}</div>
                )}
            </section>

            <h1>My Internships</h1>
            {enrolledInternships.length === 0 ? (
                <div className="no-internships">
                    <p>No internships enrolled</p>
                    <button className="browse-btn" onClick={() => navigate('/internships')}>Browse Internships</button>
                </div>
            ) : (
                <div className="enrolled-internships-grid">
                    {enrolledInternships.map(renderEnrolledInternshipCard)}
                </div>
            )}


            {/* <section className="marketplace-section">
                <h2>Marketplace</h2>
                <div className="marketplace-container">
                    <p className="marketplace-placeholder">Marketplace features coming soon...</p>
                </div>
            </section> */}
        </div>
    );
};

export default Home;
