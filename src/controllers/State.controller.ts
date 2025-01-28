import { Request, Response } from 'express'
import Estado from '../models/Estado.model'
import { AuthController } from './Auth.controller'


export class StateController {

    static getState = async (req: Request, res: Response) => {
        try {
            const states = await Estado.findAll()

            if (!states) {
                res.status(400).json({ errors: "Usuarios no creados" })
                return
            }
            res.json({ data: states[0] })
        } catch (error) {
            res.status(500).json({ errors: 'Error al obtener los datos' })
        }
    }

    static createState = async (req: Request, res: Response) => {
        try {
            const state = await Estado.create(req.body)
            res.json({ data: state })

        } catch (error) {
            console.log(error)
            res.status(500).json({ errors: 'Error al crear el estado' })
        }
    }

    static updateState = async (req: Request, res: Response) => {
        const states = await Estado.findAll()
        const state = states[0]

        if (!state) {
            const newState = await Estado.create({ descripcion: req.body.descripcion })
            await newState.save()
            
        } else {            
            await state.update(req.body)
            await state.save()
        }
        res.status(200).json('Estado actualizado')
    }
}


