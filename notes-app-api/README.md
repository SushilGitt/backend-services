# Notes App API

Implemented CRUD APIs for Notes apps!

- GET ("/api/notes/") Get all notes.
- POST ("/api/notes/") Create a note. Request body 
``` 
  {
    title: "Note title",
    content: "Note content"
  }
```
    
- GET ("/api/notes/:title") Get note by title. For e.g. /first-note
- PUT ("/api/notes/:id") Update note by id.
- DELETE ("/api/notes/:id") Delete note by id.