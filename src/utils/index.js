// funcion para calcular el total de precios de un array de productos
export const totalPrice = (arrayProducts) => {
    return arrayProducts.reduce ((acc, product) => {
        return acc + product.price
    }, 0)
}

