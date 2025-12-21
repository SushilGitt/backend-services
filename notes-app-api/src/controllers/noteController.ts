import type { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import Note from "../models/note.js"



// path: /api/notes
// method: GET
const getNotes = asyncHandler(async (req: Request, res: Response) => {
    const notes = await Note.find()
    res.json(notes)
})


// path: /api/notes/:title
const getNote = asyncHandler(async (req: Request, res: Response) => {
    // extract title of note
    const { title } = req.params

    // convert into lowercase to search in database.
    const titleSearch = String(title).toLowerCase().split('-').join(' ')
    const note = await Note.find({title: titleSearch})

    // if not found
    if(note.length == 0) {
        res.status(404)
        throw new Error("Note with given title not found!")
    }
    
    res.json({
        id: note.at(0)?.id,
        title: note.at(0)?.title,
        content: note.at(0)?.content
    })
})

// path: /api/notes
// method: POST
const createNote = asyncHandler(async (req: Request, res: Response) => {
    // extract title and content from body.
    const { title, content } = req.body


    // check if any value is missing?
    if(!title || !content) {
        res.status(400)
        throw new Error("Please add title and content!")
    }

    // convert them into lowercase for consistency.
    let lowerCaseTitle = String(title).toLowerCase()
    let lowerCaseContent = String(content).toLowerCase()

    // create new note with provided title and content.
    const newNote = await Note.create({
        title: lowerCaseTitle, 
        content: lowerCaseContent
    })

    // if note is not created throw error.
    if(!newNote) {
        res.status(500)
        throw new Error("Somthing went wrong!")
    }


    // send created note details.
    res.status(201).json({
        id: newNote.id,
        title: newNote.title,
        content: newNote.content
    })
})


// path: /api/notes/:id
// method: PUT
const updateNote = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params
    const { title, content } = req.body

    // check if any value is missing?
    if(!title || !content) {
        res.status(400)
        throw new Error("Please add title and content!")
    }
    // find note with id
    const note = await Note.findById(id)
    // not found throw error
    if(!note) {
        res.status(404)
        throw new Error("Not with id not found!")
    }

    // convert them into lowercase for consistency.
    let lowerCaseTitle = String(title).toLowerCase()
    let lowerCaseContent = String(content).toLowerCase()

    // update data
    note.title = lowerCaseTitle
    note.content = lowerCaseContent
    note.save()

    // send response
    res.status(200).json({
        id: note.id,
        title: note.title,
        content: note.content
    })
})


// path: /api/notes/:id
// method: DELETE
const deleteNote = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params
    const note = await Note.findByIdAndDelete(id)

    if(!note) {
        res.status(404)
        throw new Error("Note with id not found!")
    }

    res.status(200).json({
        id: note.id,
        title: note.title,
        content: note.content
    })
})

export {
    getNote,
    getNotes,
    createNote,
    updateNote,
    deleteNote
}