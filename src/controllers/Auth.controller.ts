import { Request, Response } from 'express'
import User from '../models/User.model'
import { checkPassword, hashPassword } from '../utils/auth'

export class AuthController {

    static login = async (req: Request, res: Response) => {
        try {
            const { username, password } = req.body

            const user = await User.findOne({ where: { username } })
     
            if (!user) {
                res.status(404).json({ errors: "El usuario no existe" })
                return
            }

           const correctPassword = await checkPassword(password, user.dataValues.password)
           
            if (!correctPassword) {                
                res.status(404).json({ errors: "Contraseña incorrecta" })
                return
            }

            res.status(200).send('Login exitoso')
        } catch (error) {
            res.status(500).json({ errors: 'Error al iniciar sesion' })
        }
    }

    static createUser = async (req: Request, res: Response) => {
        try {
            const foundUser = await User.findOne({ where: { username: req.body.username } })
            if (foundUser) {
                res.status(409).json({ errors: "El usuario ya existe" })
                return
            }

            const newUser = new User({
                username: req.body.username,
                password: await hashPassword(req.body.password)
            })           
            
            await newUser.save()

            res.status(201).json("Usuario registrado")
        } catch (error) {
            console.log(error)
            res.status(500).json({ errors: 'Error al crear usuario' })
        }
    }
}


