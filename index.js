
import express from "express"
import cartsRouter from "./carts.js"
import productosRouter from "./productos.js"

const app= express()
const port= 8080;

app.use(express.json());

app.use("/api/carts", cartsRouter);
app.use("/api/productos", productosRouter);

app.get("/",(request,response)=>{
    response.send("hola vida");
})

app.listen(port, ()=>{
    console.log("servidor funcina")
});