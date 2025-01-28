import { Router } from "express";
import { body } from "express-validator";

import { handleInputErrors } from "../middleware";
import { StateController } from "../controllers/State.controller";

const router = Router()

router.get('/state', StateController.getState)

router.patch('/state', StateController.updateState)

router.post('/state',
    body('descripcion')
        .notEmpty().withMessage('El estado no puede estar vacio')
        .isNumeric().withMessage('Solo numeros')
        .custom(value => {
            const numValue = Number(value);
            return numValue === 0 || numValue === 1;
        }).withMessage('Valores no permitidos, solo se permiten 0 o 1'),
    handleInputErrors,
    StateController.createState
)

export default router