import express from "express";
import productsRouter from './routes/productsRouter.js'

const app = express();
app.use(express.json());

app.get("/", (req,res)=> res.send("ok"))

app.use("/api/products/", productsRouter)


app.listen(8080, () => console.log("Server Up"))