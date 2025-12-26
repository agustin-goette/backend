import { Router } from "express";
import fs from "fs";
import crypto from "crypto";

const router = Router();
const archivo = "./carts.json";

router.post("/", async (req, res) => {
  let carts = [];

  if (fs.existsSync(archivo)) {
    carts = JSON.parse(await fs.promises.readFile(archivo, "utf-8"));
  }

  const nuevoCarrito = {
    id: crypto.randomUUID(),
    products: []
  };

  carts.push(nuevoCarrito);
  await fs.promises.writeFile(archivo, JSON.stringify(carts, null, 2));

  res.status(201).json(nuevoCarrito);
});


router.get("/:cid", async (req, res) => {
  const { cid } = req.params;

  if (!fs.existsSync(archivo)) {
    return res.status(404).json({ error: "No hay carritos" });
  }

  const carts = JSON.parse(await fs.promises.readFile(archivo, "utf-8"));
  const cart = carts.find(c => c.id === cid);

  if (!cart) {
    return res.status(404).json({ error: "Carrito no encontrado" });
  }

  res.json(cart.products);
});


router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;

  const carts = JSON.parse(await fs.promises.readFile(archivo, "utf-8"));
  const cart = carts.find(c => c.id === cid);

  if (!cart) {
    return res.status(404).json({ error: "Carrito no encontrado" });
  }

  const productoExistente = cart.products.find(
    p => p.product === pid
  );

  if (productoExistente) {
    productoExistente.quantity++;
  } else {
    cart.products.push({
      product: pid,
      quantity: 1
    });
  }

  await fs.promises.writeFile(archivo, JSON.stringify(carts, null, 2));
  res.json(cart);
});

export default router;