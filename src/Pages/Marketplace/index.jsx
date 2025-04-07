import { useEffect, useState } from "react";
import {getUser, getAuthHeader} from "../../utils/auth.js";
import './style.css';
import MarketPlaceCard from "../../Components/MarketplaceCard/index.jsx";
import MarketplaceForm from "../../Components/MarketplaceForm";

const Marketplace = ()=> {
    const [matchedMarketPlace, setMatchedMarketPlace] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchMarketPlace();
    }, []);

    const fetchMarketPlace = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/marketplace');
            const data = await response.json();
            console.log(data);
            findMatchedMarketplace(data.items);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setError('Failed to load marketplaces');
            setLoading(false);
        }
    }

    const findMatchedMarketplace = (marketplacesData) => {
        const user = getUser();
        const userDisabilities = user.disabilityTypes;

        const matched = marketplacesData.filter(marketplace => 
            marketplace.disabilityType.some(disability =>
                userDisabilities.includes(disability)
            )
        );
        setMatchedMarketPlace(matched);
    }

    const handleSubmit = async (formData) => {
        try {
            const response = await fetch('http://localhost:5000/api/marketplace', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to create marketplace');
            }

            setShowModal(false);
            fetchMarketPlace();
        } catch (err) {
            console.error('Error creating marketplace:', err);
            setError('Failed to create marketplace');
        }
    };

    if (loading) {
        return <div className="loading-message">Loading marketplaces...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return(
        <div className="marketplace-container flex column">
            <h1>Marketplace</h1>
            <div className="marketplace-grid">
                {matchedMarketPlace.map((marketplace, index) => (
                    <MarketPlaceCard 
                        key={index}
                        marketplace={marketplace}
                    />
                ))}
            </div>
            <button className="create-marketplace-btn" onClick={() => setShowModal(true)}>
                <i className="fa fa-plus"></i> Create New Marketplace
            </button>

            {showModal && (
                <MarketplaceForm
                    onSubmit={handleSubmit}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    )
}    

export default Marketplace;