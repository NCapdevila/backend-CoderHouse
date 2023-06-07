import { Router } from "express";
import { ProductManager } from "../helpers/productManager.js";



const router = Router();
const pm = new ProductManager('./src/assets/products.json');

router.get("/", async (req, res) => {
    const limite = req.query.limite
    const products = await pm.getProduct();
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
    const { title, description, price, status, thumbnail, code, stock } = req.body
    await pm.addProduct(title, description, price, status, thumbnail, code, stock)
    res.status(201).json({message: "Producto agregado con exito"})

})

router.put("/:pid", async (req, res) => {
    const id = req.params.pid;
    const data = req.body;
    let producttoUpdate = await pm.getProductById(id)
    producttoUpdate = {...producttoUpdate, ...data}
    await pm.updateProduct(id, producttoUpdate)
    res.status(200).json({ message: "El producto fue actualizado"});
  });
  
router.delete('/:pid', async (req,res) =>{
    const id = req.params.pid;
    await pm.deleteProduct(id)
    res.status(200).json({message: "producto eliminado"})
})

export default router

