import { Link } from "react-router-dom";

export function Invalid(){
    return(
        <div className="bg-light m-3 p-4">
            <h2 className="text-danger ">Invalid Credentails</h2>
            <p>Try agian</p>

            <div>
                <Link to='/login' > <span>Try again</span> </Link>
            </div>
        
        </div>
    )
}