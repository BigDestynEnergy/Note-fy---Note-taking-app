import { createContext, useContext, useState } from "react";
import Popup from "../components/Popup";

const PopupContext = createContext();

export const PopupProvider = ({children}) => {
    const [component, setComponent] = useState({
        isOpen:false,
        message:"",
        icon:0
    })

    const notify = (icon, message, timeout = 3000) => {
        setComponent({
            isOpen:true,
            icon,
            message
        })

        setTimeout(() => {
            setComponent({
                isOpen:false,
                message:"",
                icon:0
            })
        }, timeout);
    }

    return(
        <PopupContext.Provider value={{notify}}>
            {children}
            <Popup
            isOpen={component.isOpen}
            message={component.message}
            icon={component.icon}/>
        </PopupContext.Provider>
    )
}

export const usePopup = () => useContext(PopupContext);