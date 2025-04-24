import { useEffect, useState } from 'react';
import './style.css';
import { getAuthHeader, getUser } from '../../utils/auth';
import GenericForm from '../../Components/GenericForm';
import API from '../../services/api';

const InternshipDashboard = () => {
    const [showModal, setShowModal] = useState(false);
    const [createdInternships, setCreatedInternships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchInternships();
    }, []);

    const fetchInternships = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(API.AVAILABLE_INTERNSHIPS, {
                headers: {
                    ...getAuthHeader()
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch internships');
            }

            const data = await response.json();
            console.log(data);
            findCreatedInternships(data);
        } catch (error) {
            console.error('Error fetching internships:', error);
            setError('Failed to load internships');
        } finally {
            setLoading(false);
        }
    }

    const findCreatedInternships = (internships) => {
        try {
            const user = getUser();
            console.log('Current user:', user);
            
            if (!user || !user._id) {
                throw new Error('User not logged in');
            }

            if (!Array.isArray(internships)) {
                throw new Error('Invalid internships data');
            }

            console.log('All internships:', internships);
            console.log('User ID:', user._id);
            console.log('Provider IDs in internships:', internships.map(i => i.providerId));

            // Convert both IDs to strings for comparison
            const userId = String(user._id);
            const matched = internships.filter(internship => {
                const providerId = String(internship.providerId._id);
                console.log(`Comparing user ID ${userId} with provider ID ${providerId}`);
                return providerId === userId;
            });

            console.log('Matched internships:', matched);
            setCreatedInternships(matched);
        } catch (error) {
            console.error('Error finding created internships:', error);
            setError('Failed to process internships data');
        }
    }

    const handleSubmit = async (formData) => {
        try {
            const response = await fetch(API.AVAILABLE_INTERNSHIPS, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeader()
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to create internship');
            }

            console.log('Internship created:', data);
            setShowModal(false);
            fetchInternships();
        } catch (error) {
            console.error('Error creating internship:', error);
            alert(error.message || 'Failed to create internship');
        }
    }

    if (loading) {
        return <div className="loading-message">Loading internships...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="internship-dashboard">
            <h1>Internship Dashboard</h1>
            <div className="internships-grid">
                {createdInternships.map((internship, index) => (
                    <div key={index} className="internship-card">
                        <h3>{internship.title}</h3>
                        <p>{internship.description}</p>
                        <p>Duration: {internship.duration}</p>
                        <p>Location: {internship.location}</p>
                    </div>
                ))}
            </div>
            <button className="create-marketplace-btn" onClick={() => setShowModal(true)}>
                <i className="fa fa-plus"></i> Create New Internship
            </button>
            {showModal && (
                <GenericForm
                    type="Internship"
                    onSubmit={handleSubmit}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
}

export default InternshipDashboard;