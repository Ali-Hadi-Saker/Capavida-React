import './style.css';

const MarketPlaceCard = ({marketplace}) => {
    return(
        <div className="marketplace-card">
            <div className="marketplace-header">
                <h2 className="marketplace-name">{marketplace.name}</h2>
                <div className="marketplace-location">
                    <i className="fa fa-location-dot"></i>
                    <span>{marketplace.location}</span>
                </div>
            </div>
            <div className="marketplace-owner">
                <i className="fa fa-user"></i>
                <span>{marketplace.ownerName}</span>
            </div>
            <div className="marketplace-categories">
                <i className="fa fa-briefcase"></i>
                <span>{marketplace.category}</span>
            </div>
            {marketplace.disabilityType && marketplace.disabilityType.length > 0 && (
                <div className="marketplace-disabilities">
                    {marketplace.disabilityType.map((disability, index) => (
                        <span key={index} className="disability-tag">{disability}</span>
                    ))}
                </div>
            )}
        </div>
    )
}

export default MarketPlaceCard;