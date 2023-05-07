
const error = true;
const products = [
    {
        id: 30,
        name: "Agua Con Gas 1,5 lts",
        stock: 86,
        cost: 45,
    },
    {
        id: 29,
        name: "Agua Sin Gas 1,5 lts",
        stock: 100,
        cost: 140,
    },
    {
        id: 76,
        name: "Alambrado Chardonnay 750 ml",
        stock: 92,
        cost: 575,
    }
]

let devolverProductos = (productos) => {
    return new Promise((res, rej) => {
        
        
        if (!error){
            setTimeout(() => {
                res(productos) 
            }, 2000)
        }
        else{
            rej("Error")
        }
    })
}

devolverProductos(products)
    .then(data => {console.log(data)})
    .catch(err => console.log(err))