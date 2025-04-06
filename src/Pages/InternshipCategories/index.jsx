import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const InternshipCategories = () => {
    const navigate = useNavigate();
    const categories = [
        {
            name: "Practical Skill",
            color: "#4CAF50", // Green
            icon: "fa-tools"
        },
        {
            name: "Labor Intensive Skill",
            color: "#FF9800", // Orange
            icon: "fa-hammer"
        },
        {
            name: "Technical Skills",
            color: "#2196F3", // Blue
            icon: "fa-laptop-code"
        },
        {
            name: "Business Skill",
            color: "#9C27B0", // Purple
            icon: "fa-briefcase"
        },
        {
            name: "Care and Health",
            color: "#E91E63", // Pink
            icon: "fa-heart"
        }
    ];

    return (
        <div className="categories-container flex column">
            <div className="categories-grid flex column">
                {categories.map((category, index) => (
                    <div 
                        key={index} 
                        className="category-card"
                        style={{ backgroundColor: category.color }}
                    >
                        <i className={`fa ${category.icon}`}></i>
                        <h2>{category.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InternshipCategories;