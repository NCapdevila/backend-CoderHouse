const sales = [
    { item: 'PS4 Pro', stock: 3, original: 399.99 },
    { item: 'Xbox One X', stock: 1, original: 499.99, discount: 0.1 },
    { item: 'Nintendo Switch', stock: 4, original: 299.99 },
    { item: 'PS2 Console', stock: 1, original: 299.99, discount: 0.8 },
    { item: 'Nintendo 64', stock: 2, original: 199.99, discount: 0.65 }
];

const calculateSalesTotals = (arr) => {
    return arr.map(({item, stock, original, discount})=>{
        const sale = discount ? original - (original * discount) : original;
        return{
            key: item,
            sale: sale,
            total: sale * stock
        };
    })
}

const newArr = calculateSalesTotals(sales);
console.log(newArr);