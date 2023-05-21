import express from "express";
import { ProductManager } from "./productManager.js";

const app = express();
const PORT = 8080;
const productsClass = new ProductManager('./products.json');


app.get("/", (req, res)=>{
    res.send("HOLA MUNDO");
})

app.get("/products", async (req, res) => {
    const limite = req.query.limite
    const products = await productsClass.getProducts()
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

app.get("/products/:pid", async (req, res) => {
    const id = req.params.pid;
    const product = await productsClass.getProductById(id);

    if (product !== "Not Found") {
        res.send(product);
    } else {
        res.status(404).send("Product not found");
    }
});


app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));