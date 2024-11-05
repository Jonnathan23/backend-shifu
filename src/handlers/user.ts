import {Request, Response} from 'express'
import User from '../models/User.models'

export const getUsers = async (req:Request, res: Response) => {
    try {
        const users = await User.findAll()
        res.json({data: users})
    } catch (error) {
        
    }
}

export const createUser = async (req:Request, res: Response) => {  
    try {
        const user = await User.create(req.body)   
        res.json({data: user})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({errors:'Error al crear usuario'})
    }
}