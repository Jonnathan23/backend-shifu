import server from "./server";
import colors from "colors"

const port = 4000

server.listen(port, () => {
    console.log((`Rest api en el puerto ${port}`).blue.bold)
})