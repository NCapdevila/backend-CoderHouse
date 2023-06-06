import { Router } from "express";
import { ProductManager } from "../helpers/productManager.js";


const router = Router();
const pm = new ProductManager('../desafio04/src/assets/products.json');

router.get("/", async (req, res) => {
    const limite = req.query.limite
    const products = await pm.getProducts();
    const productsLenght = products.length;

    if(!limite){
        res.send(products) 
    }else{
        if(limite > productsLenght){
            res.status(404).send("El limite ingresado es mayor a la cantidad de productos existentes")
        }else{
            const sliceArray = products.slice(0,limite)
            res.send(sliceArray)
        }
    }
})

router.get("/:pid", async (req, res) => {
    const id = req.params.pid;
    const product = await pm.getProductById(id);

    if (product !== "Not Found") {
        res.send(product);
    } else {
        res.status(404).send("Product not found");
    }
});

router.post("/", async (req, res)=>{
    const { title, description, price, thumbnail, code, stock } = req.body
    const newProduct = await pm.createProduct(title, description, price, thumbnail, code, stock)
    res.status(201).json({message: "Producto agregado con exito"})

})

export default router

