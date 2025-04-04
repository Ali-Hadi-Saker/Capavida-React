import { useNavigate } from "react-router-dom";

const RoleSelection = ()=> {
    const navigate = useNavigate();
    const handleRoleSelect = (role)=> {
        navigate(`register/${role}`)
    }    
    return(
        <div className="flex column center">
            <h2>Choose your role</h2>
            <button onClick={()=> handleRoleSelect("Intern")}>Inter</button>
            <button onClick={()=> handleRoleSelect("Internship")}>Internship</button>
            <button onClick={()=> handleRoleSelect("Member")}>Member</button>
        </div>
    )
}

export default RoleSelection;