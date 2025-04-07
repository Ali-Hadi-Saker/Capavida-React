import React, { useState, useRef, useEffect } from 'react';
import './style.css';

const disabilities = [
    "Autism", "ADHD", "Blind", "Down Syndrome", "Dyslexia", "Mute", 
    "Fetal Alcohol", "Dyscalculia", "Amputate", "Syndrome", "APD", 
    "Narcolepsy", "Fragile X", "Deaf", "Other"
];

const categories = [
    "Food Services and Products", 
    "Textile Products and Services", 
    "Artisan Products and Services"
];

const MarketplaceForm = ({ onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        location: '',
        category: '',
        disabilityType: [],
        ownerName: '',
    });

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const toggleDisability = (disability) => {
        setFormData(prev => {
            const updatedDisabilities = prev.disabilityType.includes(disability)
                ? prev.disabilityType.filter(d => d !== disability)
                : [...prev.disabilityType, disability];
            return {
                ...prev,
                disabilityType: updatedDisabilities
            };
        });
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
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select a category</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
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
                        <label>Disability Types:</label>
                        <div className="custom-select" ref={dropdownRef}>
                            <div 
                                className="select-header" 
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                {formData.disabilityType.length === 0 
                                    ? "Select Disabilities" 
                                    : `Selected: ${formData.disabilityType.length}`}
                                <span className={`arrow ${isOpen ? 'up' : 'down'}`}></span>
                            </div>
                            {isOpen && (
                                <div className="options-container">
                                    {disabilities.map((disability, index) => (
                                        <div 
                                            key={index} 
                                            className={`option ${formData.disabilityType.includes(disability) ? 'selected' : ''}`}
                                            onClick={() => toggleDisability(disability)}
                                        >
                                            <span className="checkbox">
                                                {formData.disabilityType.includes(disability) && '✓'}
                                            </span>
                                            {disability}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
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