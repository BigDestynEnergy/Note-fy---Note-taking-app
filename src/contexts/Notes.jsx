import { createContext, useContext, useState } from "react";

const Notes = createContext();

export const NotesProvider = ({ children }) => {
    const [renderBookmark, setRenderBookmark] = useState(false);

    const [notes, setNotes] = useState(() => {
        const saved = localStorage.getItem("notes");

        return saved ? JSON.parse(saved) : [];
    });

    const addNote = (newNote) => {
        setNotes((prev) => {
            const updatedNotes = [...prev, newNote];

            localStorage.setItem("notes", JSON.stringify(updatedNotes));

            return updatedNotes;
        });
    };

    const removeNote = (id) => {
        setNotes((prev) => {
            const updatedNotes = prev.filter((note) => note.id !== id);

            localStorage.setItem("notes", JSON.stringify(updatedNotes));

            return updatedNotes;
        });
    };

    const editNote = (updatedNote) => {
        setNotes((prev) => {
            const updatedNotes = prev.map((note) =>
                note.id === updatedNote.id
                    ? {
                          ...note,
                          name: updatedNote.name,
                          content: updatedNote.content,
                          is_edited: true,
                          time: updatedNote.time
                      }
                    : note
            );

            localStorage.setItem("notes", JSON.stringify(updatedNotes));

            return updatedNotes;
        });
    };

    return (
        <Notes.Provider
            value={{
                notes,
                addNote,
                removeNote,
                editNote,
                renderBookmark,
                setRenderBookmark,
            }}
        >
            {children}
        </Notes.Provider>
    );
};

export const useNotes = () => useContext(Notes);
