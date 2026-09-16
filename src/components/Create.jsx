import { useState } from "react"
import "../styles/create.css"
import { LuX } from "react-icons/lu"
import { usePopup } from "../contexts/Popup Context"
import { useNotes } from "../contexts/Notes"
import {getFullDate} from "../utils/tools"

export default function CreateComponent({isOpen, closeForm}){
    const [form, setForm] = useState(
        {
            name:"",
            content:"",
            time: null
        }
    )

    const {notify} = usePopup();
    const {addNote} = useNotes();

    const clearForm = () => {
        setForm({
            name:"",
            content:"",
            time: null
        })
    }

    const submitForm = (e) => {
        e.preventDefault();

        if(!form.name.trim() || !form.content.trim()){
            return notify(1, "Please fill in both fields")
        }

        addNote({
            name: form.name,
            content: form.content,
            time: getFullDate(),
            id: crypto.randomUUID(),
            is_edited: false
        })

        closeForm();
        clearForm();
        notify(2, "Note successfully created.")
    }

    const manageFields = (e) => {
        const {name, value} = e.target;
        setForm((prev)=>({
            ...prev,
            [name]:value
        }))
    }


    if(!isOpen) return null
    return(
        <div className="create">
            <form onSubmit={submitForm}>
                <div className="close">
                    <LuX onClick={closeForm}/>
                </div>
                <h2>Create your note</h2>
                <div className="group">
                    <label>Name</label>
                    <input type="text" placeholder="Give your note a name"
                    value={form.name}
                    name="name"
                    onChange={manageFields}
                    />
                </div>

                <div className="group">
                    <label>Content</label>
                    <textarea placeholder="What do you want your note to say" 
                    onChange={manageFields}
                    name="content"
                    value={form.content}/>
                    </div>

                    <button type="submit">Create Note</button>

                    <span onClick={clearForm}>clear form</span>
            </form>


        </div>
    )
}