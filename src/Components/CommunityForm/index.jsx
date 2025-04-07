import React, { useState } from 'react';
import './style.css';

const CommunityForm = ({ onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        slogan: '',
        policies: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
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
        onSubmit(formData);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
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
                        <label>Community Image:</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>
                    <div className="form-actions">
                        <button type="button" onClick={onClose} className="cancel-btn">
                            Cancel
                        </button>
                        <button type="submit" className="submit-btn">
                            Create Community
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CommunityForm; 