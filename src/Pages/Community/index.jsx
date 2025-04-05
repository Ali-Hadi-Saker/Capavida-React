import { useEffect, useState } from "react";
import { getAuthHeader } from "../../utils/auth";

const Community = ()=> {
    const [communities, setCommunities] = useState([]);
    useEffect(() => {
        fetchedCommunities()
    }, []);
    const fetchedCommunities = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/communities', {
                headers: {
                    ...getAuthHeader()
                }
            })
            const data = await response.json();
            setCommunities(data);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <div>
            <h1>Community</h1>
        </div>
    )
}

export default Community;