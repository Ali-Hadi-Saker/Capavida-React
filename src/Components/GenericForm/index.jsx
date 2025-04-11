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

const skillTypes = ["Practical Skill", "Labor Intensive Skill", "Technical Skills", "Business Skill", "Care and Health"]

const GenericForm = ({ type, onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        title: '',
        description: '',
        location: '',
        category: '',
        disabilityType: [],
        skillType: '',
        ownerName: '',
        slogan: '',
        policies: '',
        duration: '',
        image: null
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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData(prev => ({
            ...prev,
            image: file
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
                <h2>Create New {type}</h2>
                <form onSubmit={handleSubmit} className="generic-form">
                    {type === 'Internship' && (
                        <>
                            <div className="form-group">
                                <label>{type} title:</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </>
                    )
                    }
                    {type !== 'Internship' && (
                        <>
                        <div className="form-group">
                        <label>{type} Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div></>
                    )}
                    <div className="form-group">
                        <label>Description:</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    {type === 'Marketplace' && (
                        <>
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
                        </>
                    )}
                    {type === 'Community' && (
                        <>
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
                                <label>{type} Image:</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </div>
                        </>
                    )}
                    {type === 'Internship' && (
                        <>
                        <div className="form-group">
                            <label>Skill type:</label>
                            <select
                                name="category"
                                value={formData.skillType}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select a skill type</option>
                                {skillTypes.map((skill, index) => (
                                    <option key={index} value={skill}>
                                        {skill}
                                    </option>
                                ))}
                            </select>
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
                        <div className="form-group">
                            <label>Duration:</label>
                            <textarea
                                name="duration"
                                value={formData.duration}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Location:</label>
                            <textarea
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </>)}
                    
                    <div className="form-actions">
                        <button type="button" onClick={onClose} className="cancel-btn">
                            Cancel
                        </button>
                        <button type="submit" className="submit-btn">
                            Create {type}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GenericForm; 