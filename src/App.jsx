import { BrowserRouter } from "react-router-dom"
import "./App.css"
import { PromptProvider } from "./contexts/Prompt Context"
import { PopupProvider } from "./contexts/Popup Context"
import Application from "./routes/Application"
import { NotesProvider } from "./contexts/Notes"
import { CreateProvider } from "./contexts/Create Context"
import { BookmarkProvider } from "./contexts/Bookmarks"

export default function App(){
  return(
    
    <BrowserRouter>
    <NotesProvider>
    <PopupProvider>
      <PromptProvider>
        <CreateProvider>
          <BookmarkProvider>
         <Application/>
         </BookmarkProvider>
         </CreateProvider>
      </PromptProvider>
      </PopupProvider>
      </NotesProvider>
    </BrowserRouter>
  )
}