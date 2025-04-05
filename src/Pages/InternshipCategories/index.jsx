import { useEffect, useState } from "react";

const internshipCategories = ()=> {
    const [categories, setCategories] = useState([]);
    useEffect(() => {fetchCategories()},[]);

    const fetchCategories = async ()=> {
        try {
            const response = await fetch('http://localhost:5000/api/internship');
            const data = await response.json();
            console.log(data)

            
        } catch (error) {            
            setError('Failed to load internships. Please try again later.');
            console.error('Error fetching internships:', error);
        }
    }
    return(
        <div></div>
    )
}

export default internshipCategories;