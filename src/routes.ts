import { Router } from "express";
import { body } from "express-validator";
import { createUser, getUsers } from "./handlers/user";
import { handleInputErrors } from "./middleware";
import { createState, getState, updateState } from "./handlers/state";

const router = Router()
//* State
router.get('/state', getState)


router.patch('/state', updateState)

router.post('/state',
    body('descripcion')
        .notEmpty().withMessage('El estado no puede estar vacio')
        .isNumeric().withMessage('Solo numeros')
        .custom(value => {            
            const numValue = Number(value);
            return numValue === 0 || numValue === 1;
        }).withMessage('Valores no permitidos, solo se permiten 0 o 1'),
        handleInputErrors,
        createState
)

//*Users


router.get('/user', getUsers)

router.post('/user',
    body('username').notEmpty().withMessage('El usuario no puede ir vacio'),
    body('password')
        .notEmpty().withMessage('La contraseña no puede ir vacia')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    handleInputErrors,
    createUser
)

export default router