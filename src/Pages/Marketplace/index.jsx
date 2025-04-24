import { useEffect, useState } from "react";
import {getUser, getAuthHeader} from "../../utils/auth.js";
import './style.css';
import MarketPlaceCard from "../../Components/MarketplaceCard/index.jsx";
import MarketplaceForm from "../../Components/MarketplaceForm";
import GenericForm from "../../Components/GenericForm";
import API from "../../services/api.js";

const Marketplace = ()=> {
    // const [matchedMarketPlace, setMatchedMarketPlace] = useState([]);
    const [marketPlace, setMarketPlace] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const user = getUser();
    const isIntern = user?.role === 'intern';

    useEffect(() => {
        fetchMarketPlace();
    }, []);

    const fetchMarketPlace = async () => {
        try {
            const response = await fetch(API.MARKETPLACE);
            const data = await response.json();
            console.log(data);
            setMarketPlace(data.items);
            // findMatchedMarketplace(data.items);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setError('Failed to load marketplaces');
            setLoading(false);
        }
    }

    // const findMatchedMarketplace = (marketplacesData) => {
    //     const user = getUser();
    //     const userDisabilities = user.disabilityTypes;

    //     const matched = marketplacesData.filter(marketplace => 
    //         marketplace.disabilityType.some(disability =>
    //             userDisabilities.includes(disability)
    //         )
    //     );
    //     setMatchedMarketPlace(matched);
    // }

    const handleSubmit = async (formData) => {
        try {
            const response = await fetch(API.MARKETPLACE, {
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
                {marketPlace.map((marketplace, index) => (
                    <MarketPlaceCard 
                        key={index}
                        marketplace={marketplace}
                    />
                ))}
            </div>
            {isIntern && 
            <button className="create-marketplace-btn" onClick={() => setShowModal(true)}>
                <i className="fa fa-plus"></i> Create New Marketplace
            </button>}

            {showModal && (
                <GenericForm
                    type="Marketplace"
                    onSubmit={handleSubmit}
                    onClose={() => setShowModal(false)}
                />
                // <MarketplaceForm
                //     onSubmit={handleSubmit}
                //     onClose={() => setShowModal(false)}
                // />
            )}
        </div>
    )
}    

export default Marketplace;