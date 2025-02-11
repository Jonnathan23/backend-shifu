import { Request, Response, NextFunction } from 'express'
import User, { UserInterface } from "../models/User.model";


declare global {
    namespace Express {
        interface Request {
            user: UserInterface
        }
    }
}

export const IsThereUser = async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.body
    const user = await User.findOne({ where: { username } })

    if (!user) {
        res.status(404).json({ errors: "El usuario no existe" })
        return
    }

    req.user = user
    next()
} 