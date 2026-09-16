import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import NotesPage from "../pages/Notes Page";

export default function Application (){
    return(
        <Routes>
            <Route path="/" element={<Layout/>}>
            <Route index element={<NotesPage/>}/>
            </Route>
        </Routes>
    )
}