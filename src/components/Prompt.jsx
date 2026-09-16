import "../styles/prompt.css"

export default function PromptComponent({isOpen, message, closePrompt,action}){
    if(!isOpen) return null

    return(
        <div className="prompt-overlay">
            <div className="card">
                <p>{message}</p>
                <div className="buttons">
                    <button onClick={action}>Continue</button>
                    <button onClick={closePrompt}>Cancel</button>
                </div>
            </div>
        </div>
    )
}