import { useEffect, useState } from 'react';
import './style.css';
import { getAuthHeader } from '../../utils/auth';

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
        
    } catch (error) {
        console.error('Error fetching internships:', error);
    }
}

    return(
        <div>
            internship
        </div>
    )
}

export default InternshipDashboard;