import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, getUser, getAuthHeader, clearAuth } from '../../utils/auth';
import './style.css';
import API from '../../services/api';

const Profile = () => {
    const navigate = useNavigate();
    const user = getUser();
    const [enrolledInternships, setEnrolledInternships] = useState([]);

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/login');
            return;
        }
        console.log(user);
        fetchEnrolledInternships();
    }, [navigate]);

    const fetchEnrolledInternships = async () => {
        try {
            const response = await fetch(API.ENROLLED_INTERNSHIPS, {
                headers: {
                    ...getAuthHeader()
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch enrolled internships');
            }

            const data = await response.json();
            setEnrolledInternships(Array.isArray(data.internships) ? data.internships : []);
        } catch (err) {
            console.error('Error fetching internships:', err);
        }
    };

    const handleLogout = () => {
        clearAuth();
        navigate('/login');
    };

    if (!user) {
        return <div className="profile-container">Loading...</div>;
    }

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-header">
                    <i className="fa fa-user-circle profile-icon"></i>
                    <h1>Profile</h1>
                </div>
                <div className="profile-info">
                    <div className="info-group">
                        <label>Name:</label>
                        <span>{user.name}</span>
                    </div>
                    <div className="info-group">
                        <label>Email:</label>
                        <span>{user.email}</span>
                    </div>
                    <div className="info-group">
                        <label>Disability Card Code:</label>
                        <span>{user.disabilityCardCode}</span>
                    </div>
                    <div className="info-group">
                        <label>Phone Number:</label>
                        <span>{user.phoneNumber || 'Not provided'}</span>
                    </div>
                    <div className="info-group">
                        <label>Disabilities:</label>
                        <div className="disabilities-list">
                            {user.disabilityTypes?.map((disability, index) => (
                                <span key={index} className="disability-tag">
                                    {disability}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="enrolled-internships-section">
                    <h2><i className="fa fa-briefcase"></i> Enrolled Internships</h2>
                    {enrolledInternships.length > 0 ? (
                        <ul className="internships-list">
                            {enrolledInternships.map((internship) => (
                                <li key={internship._id} className="internship-item">
                                    {internship.title}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="no-internships">No internships enrolled</p>
                    )}
                </div>

                <button className="logout-btn" onClick={handleLogout}>
                    <i className="fa fa-sign-out"></i>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Profile;