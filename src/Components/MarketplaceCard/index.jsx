const MarketPlaceCard = ({name, ownerName, location, category, disabilities})=> {
    return(
        <div className="marketplace-grid">
            <div className="marketplace-card">
                <h2 className="marketplace-name">{name}</h2>
                <div className="marketplace-owner">
                    <i className="fa fa-user"></i>
                    <span>{ownerName}</span>
                </div>
                <div className="marketplace-categories">
                    <i className="fa fa-briefcase"></i>
                    <span>{category}</span>
                </div>
                <div className="marketplace-location">
                    <i className="fa fa-location-dot"></i>
                    <span>{location}</span>
                </div>
                <div className="marketplace-disabilities">
                    {disabilities.map((disability, index) => (
                        <span key={index} className="disability-tag">{disability}</span>
                    ))}
                </div>
            </div>                
        </div>
    )
}

export default MarketPlaceCard;