import { createContext, useContext, useState } from "react";
import PromptComponent from "../components/Prompt";

const Prompt = createContext();

export const PromptProvider = ({ children }) => {
    const [prompt, setPrompt] = useState({
        isOpen: false,
        message: "",
        action: null,
    });

    const openPrompt = (message, action = () => {}) => {
        setPrompt({
            isOpen: true,
            message,
            action,
        });
    };

    const closePrompt = () => {
        setPrompt({
            isOpen: false,
            message: "",
            action: null,
        });
    };

    const handleAction = async () => {
        if (!prompt.action) return;

        try {
            await prompt.action();
        } finally {
            closePrompt();
        }
    };

    return (
        <Prompt.Provider value={{ openPrompt }}>
            {children}

            <PromptComponent
                isOpen={prompt.isOpen}
                message={prompt.message}
                action={handleAction}
                closePrompt={closePrompt}
            />
        </Prompt.Provider>
    );
};

export const usePrompter = () => useContext(Prompt);
