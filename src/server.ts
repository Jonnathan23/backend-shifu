import express from "express"
import router from "./routes/routes"
import { router as authRouter } from "./routes/auth.routes"
import db from "./config/db"
import cors from 'cors';
import colors from "colors"
async function conectDb() {
    try {
        await db.authenticate()
        db.sync()

        console.log(colors.cyan.bold('Conexion exitosa'))
    } catch (error) {
        console.error(error)
        console.log(colors.red.bold("Error al conectarse con la base de datos"))
    }
}


conectDb()
const server = express()

server.use(cors())
server.use(express.json())

server.use('/shifu/po', router)
server.use('/shifu/auth', authRouter)



export default server