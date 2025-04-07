import { useEffect, useState } from "react";
import {getUser} from "../../utils/auth.js";
import './style.css';
import MarketPlaceCard from "../../Components/MarketplaceCard/index.jsx";

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
        <div className="marketplace-container">
            <div className="marketplace-grid">
                {matchedMarketPlace.map((marketplace, index) => (
                    <MarketPlaceCard 
                        key={index}
                        marketplace={marketplace}
                    />
                ))}
            </div>
        </div>
    )
}    

export default Marketplace;