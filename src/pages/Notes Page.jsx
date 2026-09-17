import "../styles/notes.css"

import { useNotes } from "../contexts/Notes";
import { useEffect, useRef, useState } from "react";
import { LuBookmark, LuBookmarkCheck, LuPencil, LuTrash } from "react-icons/lu";
import { usePopup } from "../contexts/Popup Context";
import { usePrompter } from "../contexts/Prompt Context";
import { useBookmarks } from "../contexts/Bookmarks";
import { useEditor } from "../contexts/Edit Context";

export default function NotesPage(){
    const [contextMenu, setContextMenu] = useState(null);
    const menuRef = useRef();
    const {notes, removeNote, renderBookmark} = useNotes();
    const { notify } = usePopup();
    const {marked} = useBookmarks();
    const {openEditor} = useEditor();
    const {openPrompt} = usePrompter();
    const {addToBookmarks, itemExists, removeFromBookmarks} = useBookmarks();

    const buttons = [
    {name:"Edit", icon: LuPencil, id: 1201, className:"edit"},
    {name: "Bookmark", icon: LuBookmark, id: 1202, className:"bookmark"},
    {name: "Delete", icon: LuTrash, id: 1203, className:"del"}
   ];

   const allNotes = renderBookmark ? marked : notes;

   const handleContextMenu = (e, note) => {
        e.preventDefault();
        
        setContextMenu({
            note,
            x: e.clientX + 0.5,
            y: e.clientY - 0.5
        })
   }

   const manageButtons = (name, id, note) => {
    switch(name){
        case "Edit":
            openEditor(note);
            break
        case "Bookmark":
            itemExists(id) ? removeFromBookmarks(id) : addToBookmarks(note)
            itemExists(id) ? notify( 2, "Note removed from bookmarks") : notify( 2, "Note added to Bookmarks")
            break;
        case "Delete":
            openPrompt("Are you sure you want to delete this item?", ()=>{
                try{
                    removeNote(id);
                } finally{
                    notify(2, "Successfully deleted note.")
                }
            });
            break
        default:
            break
    }

    setContextMenu(null);
   }

   useEffect(()=>{
    const listenToOutsideClick = (e) => {
        if(menuRef.current && !menuRef.current.contains(e.target)){
            setContextMenu(null);
        }
    }

    document.addEventListener("click", listenToOutsideClick)

    return () => {
        document.removeEventListener("click", listenToOutsideClick)
    }

   },[])
    return(
        <section className="notes page">
            {notes.length === 0 && (<span>You don't have any notes</span>)}

            {allNotes.map(note => (
                <div className="note"
                onDoubleClick={(e)=>{
                    handleContextMenu(e, note);
                }}
                onContextMenu={(e)=>{
                    handleContextMenu(e, note);
                }}
                key={note.id}>
                    <h2>{note.name}</h2>
                    <p>{note.content}</p>
                    <small>{note.is_edited ? (<small>Edited at {note.time}</small>) : note.time}</small>

                    <div className="bookmark-icon"
                    title={itemExists(note.id) ? "Bookmarked" : "Bookmark"}
                    onClick={()=>{
                        if(itemExists(note.id)){
                            removeFromBookmarks(note.id)
                        } else{
                            addToBookmarks(note);
                        }
                    }}
                    >
                       {itemExists(note.id) ? <LuBookmarkCheck/> : <LuBookmark/>}
                    </div>
                </div>
            ))}

            {contextMenu && (
                <div className="menu"
                ref={menuRef}
                style={{
                    position:"fixed",
                    top: contextMenu.y,
                    left: contextMenu.x
                }}
                >
                    <span className="title">{contextMenu.note.name}</span>
                    {buttons.map(btn => (
                        <button
                        onClick={()=>manageButtons(btn.name, contextMenu.note.id, contextMenu.note)}
                        key={btn.id}
                        className={btn.className}>
                            {btn.name}
                            <btn.icon/>
                        </button>
                    ))}
                </div>
            )}

            {renderBookmark && marked.length === 0 && (<span>No notes were bookmarked.</span>)}


        </section>
    )
}