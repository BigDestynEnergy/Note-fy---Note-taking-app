import "../styles/notfound.css"
import { useLocation, useNavigate } from "react-router-dom";

export default function NotFound(){
    const location = useLocation();
    const nav = useNavigate();

    return(
        <div className="not-found">
            <p>
                The page "{location.pathname.replace("/","")}" does not exist.
            </p>
            <span onClick={()=>nav(-1)}>Go home</span>
        </div>
    )
}