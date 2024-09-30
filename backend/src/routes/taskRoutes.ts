import express, { Request, Response } from 'express'

const taskRouter = express.Router()

taskRouter.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Get all tasks.' })
})

taskRouter.post('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Task created.' })
})

taskRouter.put('/:id', (req: Request, res: Response) => {
    const id = req.params.id
    res.status(200).json({ message: `Task ${id} updated.` })
})

taskRouter.delete('/:id', (req: Request, res: Response) => {
    const id = req.params.id
    res.status(200).json({ message: `Task ${id} deleted.` })
})

export default taskRouter
