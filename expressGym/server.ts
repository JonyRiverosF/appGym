import http from "http";
import app from "./app";
const PORT = process.env.PORT || 3000;

const por=process.env.por || 5000;
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
const server = http.createServer(app)
server.listen(PORT,()=>{
    console.log(PORT)
})

/*const serverDos = http.createServer(appWeb)
serverDos.listen(por,()=>{
    console.log(por)
})*/