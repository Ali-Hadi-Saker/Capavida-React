import { useEffect } from "react";

const Marketplace = ()=> {
    useEffect(() => {
        fetchMarketPlace()
    }, [])

    const fetchMarketPlace = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/marketplace');
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }
    return(
        <div>
            <h1>Marketplace</h1>
        </div>
    )
}    
    export default Marketplace;