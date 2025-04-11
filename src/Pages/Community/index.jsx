import React, { useState, useEffect } from 'react';
import { getAuthHeader } from '../../utils/auth';
import './style.css';
import CommunityForm from '../../Components/CommunityForm';
import CommunityCard from '../../Components/CommunityCard';
import GenericForm from '../../Components/GenericForm';

const Community = () => {
    const [communities, setCommunities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

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

    const handleSubmit = async (formData) => {
        try {
            const response = await fetch('http://localhost:5000/api/communities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeader()
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to create community');
            }

            setShowModal(false);
            fetchCommunities();
        } catch (err) {
            console.error('Error creating community:', err);
            setError('Failed to create community');
        }
    };

    if (loading) {
        return <div className="loading-message">Loading communities...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="community-container">
            <h1>Communities</h1>
            <div className="communities-grid">
                {communities.map(community => (
                    <CommunityCard key={community._id} community={community} />
                ))}
            </div>
            <button className="create-community-btn" onClick={() => setShowModal(true)}>
                <i className="fa fa-plus"></i> Create New Community
            </button>

            {showModal && (
                <GenericForm
                    type="Community"
                    onSubmit={handleSubmit}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
};

export default Community;