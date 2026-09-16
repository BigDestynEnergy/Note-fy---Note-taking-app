import { createContext, useContext, useState } from "react";

const Bookmark = createContext();

export const BookmarkProvider = ({ children }) => {
    const [marked, setMarked] = useState(() => {
        const saved = localStorage.getItem("bookmarked");

        return saved ? JSON.parse(saved) : [];
    });

    const addToBookmarks = (note) => {
        setMarked((prev) => {
            if (prev.some((item) => item.id === note.id)) {
                return prev;
            }

            const updatedList = [...prev, note];

            localStorage.setItem(
                "bookmarked",
                JSON.stringify(updatedList)
            );

            return updatedList;
        });
    };

    const removeFromBookmarks = (id) => {
        setMarked((prev) => {
            const updatedList = prev.filter(
                (note) => note.id !== id
            );

            localStorage.setItem(
                "bookmarked",
                JSON.stringify(updatedList)
            );

            return updatedList;
        });
    };

    const itemExists = (id) => {
        return marked.some((item) => item.id === id);
    };

    return (
        <Bookmark.Provider
            value={{
                marked,
                addToBookmarks,
                removeFromBookmarks,
                itemExists,
            }}
        >
            {children}
        </Bookmark.Provider>
    );
};

export const useBookmarks = () => useContext(Bookmark);
