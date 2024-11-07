import express from "express"
import router from "./routes/routes"
import db from "./config/db"
import cors from 'cors';

async function conectDb() {
    try {
        await db.authenticate()
        db.sync()

        console.log('Conexion exitosa')
    } catch (error) {
        console.error(error)
        console.log("Error al conectarse con la base de datos")
    }
}


conectDb()
const server = express()

server.use(cors())
server.use(express.json())
server.use('/shifu/po', router)

export default server