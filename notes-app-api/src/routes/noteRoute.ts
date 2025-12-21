import { Router } from "express"
import {
    getNote,
    getNotes,
    createNote,
    updateNote,
    deleteNote
} from "../controllers/noteController.js"


const noteRouter: Router = Router()

noteRouter.get("/", getNotes)
noteRouter.post("/", createNote)
noteRouter.get("/:title", getNote)
noteRouter.put("/:id", updateNote)
noteRouter.delete("/:id", deleteNote)


export default noteRouter