import { createContext, useContext, useState } from "react";
import CreateComponent from "../components/Create";

const Create = createContext();

export const CreateProvider = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);

    const closeForm = () => setIsOpen(false);
    return(
        <Create.Provider value={{setIsOpen}}>
            {children}
            <CreateComponent
            closeForm={closeForm}
            isOpen={isOpen}/>
        </Create.Provider>
    )
}

export const useCreate = () => useContext(Create);