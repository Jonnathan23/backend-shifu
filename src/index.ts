import server from "./server";

const port = 4000

server.listen(port, () => {
    console.log(`Rest api en el puerto ${port}`)
})