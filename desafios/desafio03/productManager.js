import fs from 'fs'

export class ProductManager {
    constructor(path) {
        this.path = path
        this.format = 'utf-8'
    }

    #generateId = async () => {
        const products = await this.getProducts();
        return products.length === 0 ? 1 : products[products.length - 1].id + 1;
    }

    createProduct = async(title, description, price, thumbnail, code, stock) => {
        const products = await this.getProducts()
        const id = await this.#generateId()
        products.push({ id, title, description, price, thumbnail, code, stock})
        return await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'))
    }

    getProducts = async() => {
        return JSON.parse(await fs.promises.readFile(this.path, this.format))
    }

    getProductById = async (id) => {
        const products = await this.getProducts();
        
        const product = await products.find(item => item.id == id)
        
        if (product) return product
        return "Not Found"
    }

    updateProduct = async (id, updatedFields) => {
        const products = await this.getProducts();
      
        // Buscar el producto por su ID
        const productIndex = products.findIndex(item => item.id === id);
      
        if (productIndex === -1) {
          throw new Error("Product not found");
        }
      
        // Obtener el producto existente
        const existingProduct = products[productIndex];
      
        // Combinar los campos actualizados con el producto existente
        const updatedProduct = { ...existingProduct, ...updatedFields };
      
        // Actualizar el producto en la lista
        products[productIndex] = updatedProduct;
      
        // Guardar los cambios en el archivo
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
      
        return updatedProduct;
      }

      deleteProduct = async (id) => {
        const products = await this.getProducts();
      
        // Buscar el índice del producto por su ID
        const productIndex = products.findIndex(item => item.id === id);
      
        if (productIndex === -1) {
          throw new Error("Product not found");
        }
      
        // Eliminar el producto de la lista
        const deletedProduct = products.splice(productIndex, 1)[0];
      
        // Guardar los cambios en el archivo
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
      
        return deletedProduct;
      }
      
}



/*VISUALIZAR LOS PRODUCTOS */
/*manager.getProducts()
  .then(result => {
    console.log(result)
  })
  .catch(error => {
    console.log(error)
  })*/

  /*AGREGAR UN PRODUCTO*/
//manager.createProduct("celular", "producto2", 700, "ruta", 1055, 6)

/*VISUALIZAR POR PRODUCTO POR ID*/

/*manager.getProductById(2)
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error(error);
  });*/


/*ACTUALIZAR POR ID */

//manager.updateProduct(2, { title: "Nuevo título", price: 500 });

/*BORRAR POR ID*/
//manager.deleteProduct(2);
