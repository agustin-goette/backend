import { Router } from "express";
import fs from "fs";

const router = Router();
const archivo = "./productos.json";

// GET todos los productos
router.get("/", async (req, res) => {
  const data = await fs.promises.readFile(archivo, "utf-8");
  res.json(JSON.parse(data));
});

// GET producto por id
router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  const productos = JSON.parse(await fs.promises.readFile(archivo, "utf-8"));

  const producto = productos.find(p => p.id == pid);

  producto
    ? res.json(producto)
    : res.status(404).json({ error: "Producto no encontrado" });
});

export default router;
/*import fs from "fs"
import { Router } from "express";
const archivo = "productos.json";
const router = Router()




router.get("/product", (request, response) => {
    fs.readFile(archivo, "utf-8", (error, contenido) => {
        response.send(JSON.parse(contenido));
    })
})

router.get("/:userId", (request, response) => {
    const id = request.params.userId;
    fs.readFile(archivo, "utf-8", (error, contenido) => {
        const productos = JSON.parse(contenido);
        const producto = productos.find(item => item.id == id);

        if (producto) {
            response.send(producto);
        } else (response.send("No se encuentra el producto"));

    }
    )
})

router.post("/productos", (request, response) => {
    const { title, description, code, price, status, stock } = req.body
    const nuevoProducto = { id: productos.lenght + 1, title, description, code, price, status, stock }
    productos.push(nuevoProducto);
    res.status(201).JSON(nuevoProducto);
})

router.put("/productos.id", (request, response) => {
    const { id } = req.params;
    const { title, description, code, price, status, stock } = req.body;
    const archivo = archivos.find(u => u.id === parseInt(id));
    if (!archivo) return status(404).json({mensaje: "producto no encontrado"});
    archivo.title = title || archivo.title
    archivo.description = description || description.title
    archivo.code = code || archivo.code
    archivo.price = price || archivo.price
    archivo.status = status || archivo.status
    archivo.stock = stock || archivo.stock
    res.json(archivo)

    router.delete("/productos/:id", (request, response) => {
const {id} = req.params
archivo = archivo.filter(u=>u.id!==parseInt(id))
res.json({mensaje:"usuario eliminado"})
    })

})



export default router;*/