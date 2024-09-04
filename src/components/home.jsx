import { Link } from "react-router-dom";

export function Home(){
    return(
        <div className="d-flex justify-content-center align-content-center">
            <Link to="login" className="btn btn-warning me-2">Login</Link>
            <Link to="/register" className="btn btn-success">Register</Link>
            
    
        </div>
    )
}