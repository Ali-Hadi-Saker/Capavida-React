import './style.css';
import TextToSpeech from '../TextToSpeech';

const InternshipCard = ({ internship, onEnroll, isEnrolled, isEnrolling }) => {
    const cardContent = `
        ${internship.title}. 
        Skill type: ${internship.skillType}. 
        Located at ${internship.location}. 
        Duration: ${internship.duration}. 
        Description: ${internship.description}. 
        Suitable for: ${internship.disabilityType.join(', ')}`;

    return (
        <div className="internship-card">
            <h2 className="position">{internship.title}</h2>
            <div className="skill-type">
                <i className="fa fa-briefcase"></i> {internship.skillType}
            </div>
            <p className="location">
                <i className="fa fa-location-dot"></i> {internship.location}
            </p>
            <p className="duration">
                <i className="fa fa-calendar"></i> {internship.duration}
            </p>
            <p className="description">{internship.description}</p>
            <div className="disability-types">
                <h4>Suitable for:</h4>
                <div className="tags">
                    {internship.disabilityType.map((disability, index) => (
                        <span key={index} className="tag">{disability}</span>
                    ))}
                </div>
            </div>
            {internship.reviews && internship.reviews.length > 0 && (
                <div className="reviews-summary">
                    <i className="fa fa-star"></i>
                    {(internship.reviews.reduce((acc, review) => acc + review.rating, 0) / internship.reviews.length).toFixed(1)}
                    <span className="review-count">({internship.reviews.length} reviews)</span>
                </div>
            )}
            {internship.pdfCourses && internship.pdfCourses.length > 0 && (
                <div className="courses-available">
                    <i className="fa fa-book"></i> {internship.pdfCourses.length} Course{internship.pdfCourses.length > 1 ? 's' : ''} Available
                </div>
            )}
            <button 
                className={`enroll-btn ${isEnrolled ? 'enrolled' : ''} ${isEnrolling ? 'loading' : ''}`}
                onClick={() => onEnroll(internship._id)}
                disabled={isEnrolled || isEnrolling}
            >
                {isEnrolling ? (
                    <span className="loading-spinner"></span>
                ) : isEnrolled ? (
                    'Enrolled'
                ) : (
                    'Enroll Now'
                )}
            </button>
            <TextToSpeech text={cardContent} />
        </div>
    );
};

export default InternshipCard; 