import { useEffect, useState } from "react";
import { getUser } from "../../utils/auth";

const Profile = ()=>{
    const [user, setUser] = useState(null);
    useEffect(() => {
        const storedUser = getUser();
        setUser(storedUser);
        console.log(storedUser);
    }, []);

    return(
        <div>
            <h1>Profile</h1>
        </div>
    )
}

export default Profile;