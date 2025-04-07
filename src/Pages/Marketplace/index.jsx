import { useEffect, useState } from "react";
import {getUser} from "../../utils/auth.js";
import './style.css';

const Marketplace = ()=> {
    const [matchedMarketPlace, setMatchedMarketPlace] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                {matchedMarketPlace.map(marketplace => (
                    <div key={marketplace._id} className="marketplace-card">
                        <h2 className="marketplace-name">{marketplace.name}</h2>
                        <div className="marketplace-owner">
                            <i className="fa fa-user"></i>
                            <span>{marketplace.ownerName}</span>
                        </div>
                        <div className="marketplace-location">
                            <i className="fa fa-location-dot"></i>
                            <span>{marketplace.location}</span>
                        </div>
                        <div className="marketplace-disabilities">
                            {marketplace.disabilityType.map((disability, index) => (
                                <span key={index} className="disability-tag">{disability}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}    

export default Marketplace;