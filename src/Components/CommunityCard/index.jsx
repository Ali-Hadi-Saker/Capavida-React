import './style.css'

const CommunityCard = ({community})=> {
    return(
        <div key={community._id} className="community-card">
        <div className="community-icon">
            <i className="fa fa-users"></i>
        </div>
        <h2 className="community-name">{community.name}</h2>
        <p className="community-slogan">{community.slogan}</p>
        <button className="follow-btn">
            <i className="fa fa-plus"></i> Follow
        </button>
    </div>
    )
}

export default CommunityCard;