import React, { useState, useEffect } from 'react';
import { getAuthHeader } from '../../utils/auth';
import './style.css';
import CommunityCard from '../../Components/CommunityCard';

const Community = () => {
    const [communities, setCommunities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        slogan: '',
        policies: '',
    });

    useEffect(() => {
        fetchCommunities();
    }, []);

    const fetchCommunities = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/communities', {
                headers: {
                    ...getAuthHeader()
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch communities');
            }

            const data = await response.json();
            setCommunities(data);
            setError(null);
        } catch (err) {
            setError('Failed to load communities');
            console.error('Error fetching communities:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(e.target.value);

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData(prev => ({
            ...prev,
            image: file
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const body = JSON.stringify(formData);

        console.log(body);

        try {
            const response = await fetch('http://localhost:5000/api/communities/create', {
                method: 'POST',
                headers: {
                    ...getAuthHeader(),
                    'Content-Type': 'application/json' 
                },
                body
            });

            if (!response.ok) {
                throw new Error('Failed to create community');
            }

            // Refresh communities list
            await fetchCommunities();
            setShowModal(false);
            // Reset form
            setFormData({
                name: '',
                description: '',
                slogan: '',
                policies: '',
            });
        } catch (err) {
            console.error('Error creating community:', err);
            alert('Failed to create community. Please try again.');
        }
    };

    if (loading) return <div className="community-container"><div className="loading-message">Loading communities...</div></div>;
    if (error) return <div className="community-container"><div className="error-message">{error}</div></div>;

    return (
        <div className="community-container">
            <h1>Communities</h1>
            <div className="communities-grid">
                {communities.map(community => (
                    <CommunityCard community={community}/>
                ))}
            </div>
            <button className="create-community-btn" onClick={() => setShowModal(true)}>
                <i className="fa fa-plus"></i> Create New Community
            </button>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h2>Create New Community</h2>
                        <form onSubmit={handleSubmit} className="community-form">
                            <div className="form-group">
                                <label>Community Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Description:</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Slogan:</label>
                                <input
                                    type="text"
                                    name="slogan"
                                    value={formData.slogan}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Policies:</label>
                                <textarea
                                    name="policies"
                                    value={formData.policies}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Community Picture:</label>
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                />
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="submit-btn">
                                    Create Community
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Community;