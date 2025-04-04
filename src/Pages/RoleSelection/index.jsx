import { useNavigate } from "react-router-dom";
import "./style.css";

const RoleSelection = ()=> {
    const navigate = useNavigate();
    const handleRoleSelect = (role)=> {
        navigate(`register/${role}`)
    }    
    return(
        <div className="role-selection-container flex column center">
            <h2 className="role-selection-title">Choose your role</h2>
            <div className="role-selection-buttons flex column center">
                <button className="role-button" onClick={()=> handleRoleSelect("Intern")}>Intern</button>
                <button className="role-button" onClick={()=> handleRoleSelect("Internship")}>Internship</button>
                <button className="role-button" onClick={()=> handleRoleSelect("Member")}>Member</button>
            </div>
        </div>
    )
}

export default RoleSelection;