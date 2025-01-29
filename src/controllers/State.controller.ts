import { Request, Response } from 'express'
import Estado from '../models/Estado.model'


export class StateController {

    static getState = async (req: Request, res: Response) => {
        try {
            const states = await Estado.findAll()

            console.log('\n -----------| | States | |------------')
            console.log(states)
            console.log(!states)
            if (!states) {
                res.status(200).json({ data: [] })
                return
            }
            console.log(states.length)
            states.length ? res.status(200).json({ data: states[0] }) : res.status(200).json({ data: [] })
            //res.status(200).json({ data: states[0] })
        } catch (error) {
            res.status(500).json({ errors: 'Error al obtener los datos' })
        }
    }

    static createState = async (req: Request, res: Response) => {
        try {
            const state = await Estado.create(req.body)

            res.status(201).send('Estado creado')
        } catch (error) {
            console.log(error)
            res.status(500).json({ errors: 'Error al crear el estado' })
        }
    }

    static updateState = async (req: Request, res: Response) => {
        try {
            const states = await Estado.findAll()
            let state = states[0]

            !state ? state = await Estado.create(req.body) : await state.update(req.body)

            await state.save()
            res.status(200).send('Estado actualizado')
        } catch (error) {
            res.status(500).json({ errors: error })
        }
    }
}


