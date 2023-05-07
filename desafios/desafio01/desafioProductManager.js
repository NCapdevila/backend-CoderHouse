class ProductManager {
    #products
    #error
    constructor(){
        this.#products = [];
        this.#error = undefined
    }

    getProducts = () => this.#products;


    getProductById = (id) =>{
        const product = this.#products.find(item => item.id === id)
        if (product) return product
        return "Not Found"
    }

    #generateId = () => (this.#products.length === 0) ? 1 : this.#products[this.#products.length-1].id + 1

    #validateProduct = ({ title, description, price, thumbnail, code, stock }) =>{
        if(title && description && price && thumbnail && code && stock){
            
            const product = this.#products.find(item => item.code === code)
            
            product ? this.#error = `[${title}]: Already existing code` : this.#error = undefined
        }else{
            this.#error =  `[${title}]: All fields is required`
        }
        
    }

    addProduct = (title, description, price, thumbnail, code, stock) =>{
        const product = { id:this.#generateId(), title, description, price, thumbnail, code, stock }

        this.#validateProduct(product)
        this.#error === undefined 
        ? this.#products.push(product) 
        : console.log(this.#error)

    }
}

const manager = new ProductManager();
console.log(manager.getProducts()); 
manager.addProduct("control", "producto1", 400, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJzM8j7soQopI3Q9Tfij7rm3YVOR9VuFXw2A&usqp=CAU", 1054, 5);
manager.addProduct("manzana", "producto2", 680, "https://biotrendies.com/wp-content/uploads/2015/06/manzana.jpg", 1055, 20);
manager.addProduct("celular", "producto3", 45000, "https://images.fravega.com/f500/652241a93ff6eddb5437281fd23cc5b0.jpg", 1055, 10); //Caso con code repetido
manager.addProduct("auriculares"); //Caso con campos faltantes
console.log(manager.getProducts());
console.log(manager.getProductById(2));
console.log(manager.getProductById(5)); //Caso con id no creado


