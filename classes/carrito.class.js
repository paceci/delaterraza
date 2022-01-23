class Carrito {


    constructor(

        productos,
        detallesOrden


    )
    {
        this.productos=productos,
        this.detallesOrden=detallesOrden
    }

    agregarProducto(producto){
        this.productos.push(producto);
    }

    quitarProducto(producto)
    {
        const index = this.productos.findIndex(element=>element===producto);
        this.productos.splice(index,1);
    }

    totalizar()
    {
        let suma=0;
       this.productos.forEach(element => {
           suma+=element.precio;
       });
        console.log(suma);
        return suma;
    }


}

