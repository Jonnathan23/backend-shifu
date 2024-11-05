import {Request, Response} from 'express'
import Estado from '../models/Estado.models'

export const getState = async (req:Request, res: Response) => {
    try {
        const users = await Estado.findAll()
        res.json({data: users})
    } catch (error) {
        
    }
}


export const createState = async(req:Request, res:Response) => {
    try {
        const state = await Estado.create(req.body)
        res.json({data: state})        
        
    } catch (error) {
        console.log(error)
        res.status(500).json({errors:'Error al crear el estado'})
    }
}