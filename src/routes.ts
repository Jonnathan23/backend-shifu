import { Router } from "express";

const router = Router()

router.get('/', (req, res) => {
    res.json('Desde el get')
})


router.put('/', (req, res) => {
    res.json('Desde el PUT')
})

router.post('/', (req, res) => {
    res.json('Desde el post')
})

export default router