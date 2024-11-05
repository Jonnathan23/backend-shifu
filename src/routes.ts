import { Router } from "express";
import { body } from "express-validator";
import { createUser } from "./handlers/user";

const router = Router()

router.get('/', (req, res) => {
    res.json('Desde el get')
})


router.patch('/', (req, res) => {
    res.json('Desde el PUT')
})

router.post('/user',
    body('username').isEmpty().withMessage('El usuario no puede ir vacio'),
    body('password')
        .isEmpty().withMessage('La contraseña no puede ir vacia')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    
    createUser
)

export default router