/*import http from "http"

const server = http.createServer((request,response)=>{
    response.end("Hola mundo!!!!");
})

const port= 8080;

server.listen(port,()=>{
    console.log("servido activo" + port )
})*/

import express from "express"

const app = express();
const port= 8080 ;

app.get("/",(request,response)=>{
    response.send("hola mundo");
})

app.listen(port, () =>{
   console.log("servidor activo:" + port)
})