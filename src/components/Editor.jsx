import { useEffect, useState } from "react";
import { useNotes } from "../contexts/Notes";
import "../styles/create.css";
import { LuX } from "react-icons/lu";
import { usePopup } from "../contexts/Popup Context";
import { getTimeOfDay } from "../utils/tools";

export default function Editor({ isEditsOpen, closeForm }) {
    const { editNote } = useNotes();
    const { notify } = usePopup();

    const [form, setForm] = useState({
        id: null,
        name: "",
        content: "",
        time: null,
    });

    // Fill the form whenever a note is opened for editing
    useEffect(() => {
        if (isEditsOpen) {
            setForm({
                id: isEditsOpen.id,
                name: isEditsOpen.name || "",
                content: isEditsOpen.content || "",
                time: isEditsOpen.time || null,
            });
        }
    }, [isEditsOpen]);

    const manageFields = (field, value) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const clearForm = () => {
        setForm((prev) => ({
            ...prev,
            name: "",
            content: "",
        }));
    };

    const submitForm = (e) => {
        e.preventDefault();

        if (!form.name.trim() && !form.content.trim()) {
            notify(1, "Please make at least one change to your note.");
            return;
        }

        editNote({
            id: form.id,
            name: form.name.trim(),
            content: form.content.trim(),
            time: getTimeOfDay(),
        });

        notify(2, "Note successfully edited.");
        closeForm();
    };

    if (!isEditsOpen) return null;

    return (
        <div className="create">
            <form onSubmit={submitForm}>
                <div className="close">
                    <LuX onClick={closeForm} />
                </div>

                <h2>Edit your note</h2>

                <div className="group">
                    <label>Name</label>

                    <input
                        type="text"
                        placeholder="Edit your note's name"
                        value={form.name}
                        onChange={(e) =>
                            manageFields("name", e.target.value)
                        }
                    />
                </div>

                <div className="group">
                    <label>Content</label>

                    <textarea
                        placeholder="What do you want your edited note to say?"
                        value={form.content}
                        onChange={(e) =>
                            manageFields("content", e.target.value)
                        }
                    />
                </div>

                <button type="submit">Edit Note</button>

                <span onClick={clearForm}>Clear form</span>
            </form>
        </div>
    );
}
