import express from "express"
import router from "./routes"
import db from "./config/db"

async function conectDb(){
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


server.use('/po/estado', router)
//server.use('/proyecto', router)
export default server