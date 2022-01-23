
 const carrito = new Carrito([]);


function init() {
   mostrarTitulo1();
   mostrarTitulo2();
   tituloImagenes();
}

function mostrarTitulo1(){

   const nodoTitulo = $("#titulo");
   const nodoTituloBienvenida = $("<h1></h1>");
   nodoTituloBienvenida.attr("id", "titulo1");
   nodoTituloBienvenida.html("Somos de la Terraza. Pintamos macetas de barro artesanalmente.");
   nodoTitulo.prepend(nodoTituloBienvenida);
   $("#titulo1").hide();
   $("#titulo1").slideDown(2000);
   tituloImagenes();

}

function tituloImagenes() {
   const nodoTituloImagenes = $("#tituloImagenes").html("<br><h2>Te mostramos lo que hacemos.</h2>");
  
}
function mostrarTitulo2(){

   const nodoTitulo2 = $("#titulo2");
   const nodoHacePedido = $("<h2></h2>");
   nodoHacePedido.attr("id", "pedido");
   nodoHacePedido.html("Hace tu pedido.");
   nodoTitulo2.prepend(nodoHacePedido);

   $("#pedido").mouseover(function () { 
      $("#pedido").css({
         "color":"rgba(149, 201, 147, 1)",
         "cursor":"pointer",
      });
   });

   $("#pedido").mouseout(function () { 
      $("#pedido").css({
         "color":"rgb(4,56,7)",
      });
   });

   $("#pedido").click(function () { 
      listarCategorias();
      
   });
    
}

function listarCategorias() {
   $.get("data/categorias.json", (respuesta, estado) => {
      if(estado==="success") {
         mostrarCat(respuesta.categorias);
      }
     
   });

   $("#imgppal").animate({
   height:'auto',
   width:'500px'
   },
   "slow",
   function(){
      console.log("Categorias listadas.")
   });
      
}

function mostrarCat(array) { 
   array.forEach(cat => {
      $("#mainContainer").append(
               `<div id="categorias">
                  <div class="tituloCat">
                     <a onclick="listarProductos(${cat.id})">${cat.nombre}</a>
                  </div>
                  <img id="catImg" class="card-img-top rounded" src="${cat.url}" alt="${cat.nombre}">
               </div>
               `);            
   });
  
}

function listarProductos(idCategoria)
{
   const nodoProductos = $("#productos")[0];
   nodoProductos.innerHTML=`<h2>Elegí la que más te guste:</h2>`;
   let lista=document.createElement("div");

   const productosCategoria= productos.filter(element=> element.categoria===idCategoria);

   for(var i=0;i<productosCategoria.length; i++)
   {
      let producto = productosCategoria[i];

      let item  = document.createElement("div");
      item.innerHTML=`<hr><h4>${producto.nombre}</h4>
                     <h4>${producto.medida}</h4>
                     <h4>$ ${producto.precio}</h4>
                     `;

      let boton = document.createElement("button");
      boton.onclick = () => {
         carrito.agregarProducto(producto);
         actualizarCarrito();
         localStorage.setItem(idCategoria, JSON.stringify(producto));
      }

      boton.innerHTML="Comprar";

      item.appendChild(boton);

      lista.appendChild(item);
      
      

   }
   nodoProductos.appendChild(lista);

   
}

function actualizarCarrito()
{
   //Listar el carrito;

   const nodoCarrito = $("#carritoModal")[0];
   nodoCarrito.innerHTML="";
   const productos = carrito.productos;

   let contador = 0;
   while(contador<productos.length)
   {
      let producto = productos[contador];

      let item  = document.createElement("div");
      item.innerHTML=`<hr><div>${producto.nombre}</div>
                     <div>${producto.medida}</div>
                     <div>$ ${producto.precio}</div>
                     `;
      nodoCarrito.appendChild(item);

      let botonQuitar = document.createElement("button");
      botonQuitar.innerHTML="Eliminar";
      botonQuitar.onclick=()=>
      {
         if(confirm("Estas seguro que queres quitar esta maceta?"))
         {
               carrito.quitarProducto(producto);
               actualizarCarrito();
         }
      }

      nodoCarrito.appendChild(botonQuitar);

      contador++;

   }
   //Totalizar carrito y modal
   
   const nodoContendorTotal = document.createElement("div");
   nodoContendorTotal.appendChild(document.createElement("hr"));
   
   const total = carrito.totalizar();

   const nodoTotal = document.createElement("h4");
   nodoContendorTotal.appendChild(nodoTotal);

   nodoCarrito.appendChild(nodoContendorTotal);
   $("#carritoModal").append(`<hr><p class="total">Tu pedido es de $ ${total.toFixed(2)}</p>
   `);

   //Confirmar compra

      const botonConfirmar = document.createElement("button");
      // nodoCarrito.appendChild(document.createElement("hr"));
      botonConfirmar.innerText="Confirmas la compra?";
      botonConfirmar.onclick = () => {
         confirm("Confirmá");

      const nodoCostoEnvio=$("#costoEnvio")[0];
      nodoCarrito.appendChild(document.createElement("hr"));
      let botonCostoEnvio = nodoCarrito.appendChild(document.createElement("button"));
      botonCostoEnvio.innerHTML="Conocé el costo de tu envío";
      botonCostoEnvio.onclick = () => {
            nodoCarrito.innerHTML=`<h4>Tu costo de envío es de $150.</h4>
                                    <h3>Te contactaremos a la brevedad.</h3>
                                    <h2>Gracias por tu compra!</h2>`;
                                    }

      }
   

   nodoContendorTotal.appendChild(botonConfirmar);
   
}


