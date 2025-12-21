import type { 
    Request, 
    Response, 
    NextFunction } from "express"
    
    
const notFound = (req:Request, res: Response, next: NextFunction) => {
    res.status(404)
    const err = new Error(`Not found: ${req.originalUrl}`)
    next(err)
}


const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode

    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack
    })
}

export { notFound, errorHandler }