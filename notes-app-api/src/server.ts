import "dotenv/config"
import express from "express"
import type { Application, Request, Response } from "express"
import connectDB from "./config/mongoDB.js"
import noteRouter from "./routes/noteRoute.js"
import { notFound, errorHandler} from "./middlewares/errorHandler.js"


const port: string = process.env.PORT || "5050"
const app: Application = express()
connectDB()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Api endpoints
app.get("/", (req: Request, res: Response) => {
    res.json({
        message: "Welcome to Notes app!"
    })
})

app.use("/api/notes", noteRouter)


// Error handlers
app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`Server is running on port: ${port}`))