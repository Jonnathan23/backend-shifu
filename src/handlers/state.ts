import { Request, Response } from 'express'
import Estado from '../models/Estado.models'

export const getState = async (req: Request, res: Response) => {
    try {
        const users = await Estado.findAll()
        if (!users) {
            res.status(400).json({ errors: "Usuarios no creados"})
            return
        }
        res.json({ data: users })
    } catch (error) {
        res.status(500).json({ errors: 'Error al obtener los datos' })
    }
}


export const createState = async (req: Request, res: Response) => {
    try {
        const state = await Estado.create(req.body)
        res.json({ data: state })

    } catch (error) {
        console.log(error)
        res.status(500).json({ errors: 'Error al crear el estado' })
    }
}

export const updateState = async (req: Request, res: Response) => {
    const state = await Estado.findByPk(1)

    if(!state){
        res.status(400).json({ errors: "Sin estados"})
        return
    }

    await state.update(req.body)
    await state.save()

    res.json({data: state})
}