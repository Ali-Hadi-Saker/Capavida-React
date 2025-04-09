import { useEffect, useState } from 'react';
import './style.css';
import { getAuthHeader, getUser } from '../../utils/auth';

const InternshipDashboard = ()=> {
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

    return(
        <div>
            internship
        </div>
    )
}

export default InternshipDashboard;