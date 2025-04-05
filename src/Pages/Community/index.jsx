import React, { useState, useEffect } from 'react';
import { getAuthHeader } from '../../utils/auth';
import './style.css';

const Community = () => {
    const [communities, setCommunities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
    }

    return (
        <div className="community-container">
            <h1>Communities</h1>
            <div className="communities-grid">
                {communities.map(community => (
                    <div key={community._id} className="community-card">
                        <div className="community-icon">
                            <i className="fa fa-users"></i>
                        </div>
                        <h2 className="community-name">{community.name}</h2>
                        <p className="community-slogan">{community.slogan}</p>
                        <button className="follow-btn">
                            <i className="fa fa-plus"></i> Follow
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Community;