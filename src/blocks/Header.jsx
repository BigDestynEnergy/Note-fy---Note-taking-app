import { useCreate } from "../contexts/Create Context"
import { useNotes } from "../contexts/Notes";
import { usePrompter } from "../contexts/Prompt Context"
import "../styles/header.css"
import { getTimeOfDay } from "../utils/tools";

export default function Header(){
    const {setIsOpen} = useCreate();
    const {setRenderBookmark, renderBookmark} = useNotes();

    const buttons = [
        {name: "Create Note", id: 1},
        {name: "Bookmarks", id: 2}
    ]

    const manageButtons = (id) => {
        if(id === 1){
            setIsOpen(true)
        } else{
            setRenderBookmark(!renderBookmark);
        }
    }

    return(
        <header>
            <h1>Note-fy</h1>

            <div className="buttons">
                {buttons.map(btn => (
                    <button
                    onClick={()=>manageButtons(btn.id)}
                    key={btn.id}>
                    {btn.name}
                </button>))}
            </div>
        </header>
    )
}