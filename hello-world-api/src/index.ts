import express from "express"
import dotenv from "dotenv"
import type { Application, Request, Response } from "express"

dotenv.config()
const app: Application = express()
const port: number | string = process.env.PORT || 3000

app.use(express.json())

app.get("/", (req: Request, res: Response) => {
    res.send("Hello, world!")
})

app.listen(port, () => console.log(`Server is running on port ${port}`))