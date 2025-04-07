import React, { useState } from 'react';
import './style.css';

const MarketplaceForm = ({ onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        location: '',
        category: '',
        disabilityType: [],
        ownerName: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDisabilityChange = (e) => {
        const { value } = e.target;
        setFormData(prev => ({
            ...prev,
            disabilityType: value.split(',').map(item => item.trim())
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h2>Create New Marketplace</h2>
                <form onSubmit={handleSubmit} className="marketplace-form">
                    <div className="form-group">
                        <label>Marketplace Name:</label>
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
                        <label>Location:</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Category:</label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Owner Name:</label>
                        <input
                            type="text"
                            name="ownerName"
                            value={formData.ownerName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Disability Types (comma-separated):</label>
                        <input
                            type="text"
                            name="disabilityType"
                            value={formData.disabilityType.join(', ')}
                            onChange={handleDisabilityChange}
                            placeholder="e.g., Visual Impairment, Hearing Impairment"
                            required
                        />
                    </div>
                    <div className="form-actions">
                        <button type="button" onClick={onClose} className="cancel-btn">
                            Cancel
                        </button>
                        <button type="submit" className="submit-btn">
                            Create Marketplace
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MarketplaceForm;