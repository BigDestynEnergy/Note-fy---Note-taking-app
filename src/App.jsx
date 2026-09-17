import { BrowserRouter } from "react-router-dom"
import "./App.css"
import { PromptProvider } from "./contexts/Prompt Context"
import { PopupProvider } from "./contexts/Popup Context"
import Application from "./routes/Application"
import { NotesProvider } from "./contexts/Notes"
import { CreateProvider } from "./contexts/Create Context"
import { BookmarkProvider } from "./contexts/Bookmarks"
import { EditsProvider } from "./contexts/Edit Context"

export default function App(){
  return(
    
    <BrowserRouter>
    <NotesProvider>
    <PopupProvider>
      <PromptProvider>
        <CreateProvider>
          <BookmarkProvider>
        <EditsProvider>
         <Application/>
        </EditsProvider>
         </BookmarkProvider>
         </CreateProvider>
      </PromptProvider>
      </PopupProvider>
      </NotesProvider>
    </BrowserRouter>
  )
}