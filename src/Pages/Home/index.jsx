import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, getAuthHeader, handleAuthResponse } from '../../utils/auth';
import "./style.css";

const Home = () => {
    const [enrolledInternships, setEnrolledInternships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [question, setQuestion] = useState("");
    const [aiResponse, setAiResponse] = useState("");
    const [isAiLoading, setIsAiLoading] = useState(false);
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
        } catch (err) {
            setError('Failed to load internships');
        } finally {
            setLoading(false);
        }
    };

    const handleAskAi = async (e) => {
        e.preventDefault();
        if (!question.trim()) return;

        setIsAiLoading(true);
        setAiResponse("");

        try {
            const response = await fetch('http://localhost:5000/api/ai/ask', {
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
            setAiResponse(data.response);
        } catch (err) {
            setAiResponse("Sorry, I couldn't process your request. Please try again.");
        } finally {
            setIsAiLoading(false);
        }
    };

    const renderEnrolledInternshipCard = (internship) => (
        <div key={internship._id} className="internship-card">
            <h3>{internship.title}</h3>
            <p>{internship.skillType}</p>
            <p>{internship.location}</p>
            <p>{internship.duration}</p>
        </div>
    );

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

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
                    <button onClick={() => navigate('/internships')}>Browse Internships</button>
                </div>
            ) : (
                <div className="internships-grid">
                    {enrolledInternships.map(renderEnrolledInternshipCard)}
                </div>
            )}

            <section className="marketplace-section">
                <h2>Marketplace</h2>
                <div className="marketplace-container">
                    <p className="marketplace-placeholder">Marketplace features coming soon...</p>
                </div>
            </section>
        </div>
    );
};

export default Home;
