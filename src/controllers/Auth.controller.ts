import { Request, Response } from 'express'
import User from '../models/User.model'
import { checkPassword, hashPassword } from '../utils/auth'
import Token from '../models/Token.model'
import { generateToken } from '../utils/token'

export class AuthController {

    static login = async (req: Request, res: Response) => {
        try {
            const { password } = req.body
            const user = req.user

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

    static forgotPassword = async (req: Request, res: Response) => {
        try {
            const user = req.user
            const token = await Token.create({ token: generateToken(), user_id: user.dataValues.id })

            token.save();
            res.status(200).send('Token generado')
        } catch (error) {
            res.status(500).json({ errors: error })
        }
    }

    static validateTokenPassword = async (req: Request, res: Response) => {
        try {
            const { token } = req.params

            const foundToken = await Token.findOne({ where: { token } })

            if (!foundToken) {
                res.status(404).json({ errors: "Token no encontrado" })
                return
            }         

            res.status(200).send('Token valido')

        } catch (error) {
            res.status(500).json({ errors: error })
        }
    }

    static resetPassword = async (req: Request, res: Response) => {
       try {
           const { password } = req.body
           
           const user = req.user

           user.dataValues.password = await hashPassword(password)

           await user.save()

       } catch(error) {
           res.status(500).json({ errors: error })
       }
    }
}