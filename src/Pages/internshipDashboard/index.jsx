import { useEffect, useState } from 'react';
import './style.css';
import { getAuthHeader, getUser } from '../../utils/auth';
import GenericForm from '../../Components/GenericForm';

const InternshipDashboard = ()=> {
const [showModal, setShowModal] = useState(false);
const [createdInternships, setCreatedInternships] = useState([]);
useEffect(() => {fetchInternships()}, []);

const fetchInternships = async ()=> {
    try {
        const response = await fetch('http://localhost:5000/api/internship', {
            headers: {
                ...getAuthHeader()
            }
        })
        const data = await response.json();
        console.log(data);
        findCreatedInternships(data);
        
    } catch (error) {
        console.error('Error fetching internships:', error);
    }
}

const findCreatedInternships = (internships)=> {
    const user = getUser();
    const userId = user._id;
    const matched = internships.filter(intership => intership.providerId == userId);
    console.log(matched);
    setCreatedInternships(matched);
}

const handleSubmit =  () => {
    console.log("submit");
}

    return(
        <div>
            internship
            <button className="create-marketplace-btn" onClick={() => setShowModal(true)}>
                <i className="fa fa-plus"></i> Create New Internship
            </button>
            {showModal && (
                <GenericForm
                    type="Internship"
                    onSubmit={handleSubmit}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    )
}

export default InternshipDashboard;