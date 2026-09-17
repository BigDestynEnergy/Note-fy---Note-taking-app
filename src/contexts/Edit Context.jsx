import { createContext, useContext, useState } from "react";
import Editor from "../components/Editor";

const EditsContext = createContext();


export const EditsProvider = ({children}) => {
    const [isEditsOpen, setIsEditsOpen] = useState(null);

    const openEditor = (note) => {
        setIsEditsOpen(note);
    }

    const closeForm = () => {
        setIsEditsOpen(null)
    }

    return(
        <EditsContext.Provider value={{openEditor}}>
            {children}
            <Editor
            closeForm={closeForm}
            isEditsOpen={isEditsOpen}/>
        </EditsContext.Provider>
    )
}

export const useEditor = () => useContext(EditsContext);