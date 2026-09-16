import { LuCircleAlert, LuCircleCheck } from "react-icons/lu"
import "../styles/popup.css"

export default function Popup({isOpen, icon, message}){
    if(!isOpen) return null

    return(
        <div className="popup">
            {icon === 1 && (<LuCircleAlert style={{color:"var(--color-accent)"}}/>)}
            {icon === 2 && (<LuCircleCheck style={{color:"var(--color-success)"}}/>)}

            <span>{message}</span>
        </div>
    )
}