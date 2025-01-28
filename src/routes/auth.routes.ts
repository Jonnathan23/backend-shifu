import { Router } from "express";
import { handleInputErrors } from "../middleware";
import { AuthController } from "../controllers/Auth.controller";
import { body } from "express-validator";

const router = Router()

//* |---| | login | |----|
router.post('/login',
    body('username').notEmpty().withMessage('El usuario no puede ir vacio'),
    body('password').notEmpty().withMessage('La contraseña no puede ir vacia'),
    handleInputErrors,
    AuthController.login
)

router.post('/create-user',
    body('username').notEmpty().withMessage('El usuario no puede ir vacio'),
    body('password')
        .notEmpty().withMessage('La contraseña no puede ir vacia')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('password_confirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Las contraseñas no coinciden')
        }
        return true
    }),
    handleInputErrors,
    AuthController.createUser
)



export { router }