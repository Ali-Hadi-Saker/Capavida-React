import { useEffect, useState } from "react";
import {getUser} from "../../utils/auth.js";

const Marketplace = ()=> {
const [matchedMarketPlace, setMatchedMarketPlace] = useState([])

    useEffect(() => {
        fetchMarketPlace()
    }, [])

    const fetchMarketPlace = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/marketplace');
            const data = await response.json();
            console.log(data);
            findMatchedMarketplace(data.items);
        } catch (error) {
            console.error(error);
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
        console.log(matched);
                
    }
    return(
        <div>
            <h1>Marketplace</h1>
        </div>
    )
}    
    export default Marketplace;