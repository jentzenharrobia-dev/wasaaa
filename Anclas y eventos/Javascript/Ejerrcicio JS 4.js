/*OBTENEMOS LA REFERENCIA A LOS ELEMENTOS */ 
let articulo01 = document.getElementById("01");
let articulo02 = document.getElementById("02");
let articulo03 = document.getElementById("03");
let articulo04 = document.getElementById("04");
let articulo05 = document.getElementById("05");
let articulo06 = document.getElementById("06");
let articulo07 = document.getElementById("07");
let articulo08 = document.getElementById("08");
let articulo09 = document.getElementById("09");
let articulo10 = document.getElementById("10");
let articulo11 = document.getElementById("11");
let articulo12 = document.getElementById("12");
let articulo13 = document.getElementById("13");
let articulo14 = document.getElementById("14");
let articulo15 = document.getElementById("15");
let articulo16 = document.getElementById("16");
let articulo17 = document.getElementById("17");
let articulo18 = document.getElementById("18");
let articulo19 = document.getElementById("19");
let articulo20 = document.getElementById("20");
let detalles = document.getElementById("detalles");
let carrito = document.getElementById("carrito");

/*METEMOS los eventos*/ 
articulo01.addEventListener("click",() => mostrarDetalles(articulo01));
articulo02.addEventListener("click",() => mostrarDetalles(articulo02));
articulo03.addEventListener("click",() => mostrarDetalles(articulo03));
articulo04.addEventListener("click",() => mostrarDetalles(articulo04));
articulo05.addEventListener("click",() => mostrarDetalles(articulo05));
articulo06.addEventListener("click",() => mostrarDetalles(articulo06));
articulo07.addEventListener("click",() => mostrarDetalles(articulo07));
articulo08.addEventListener("click",() => mostrarDetalles(articulo08));
articulo09.addEventListener("click",() => mostrarDetalles(articulo09));
articulo10.addEventListener("click",() => mostrarDetalles(articulo10));
articulo11.addEventListener("click",() => mostrarDetalles(articulo11));
articulo12.addEventListener("click",() => mostrarDetalles(articulo12));
articulo13.addEventListener("click",() => mostrarDetalles(articulo13));
articulo14.addEventListener("click",() => mostrarDetalles(articulo14));
articulo15.addEventListener("click",() => mostrarDetalles(articulo15));
articulo16.addEventListener("click",() => mostrarDetalles(articulo16));
articulo17.addEventListener("click",() => mostrarDetalles(articulo17));
articulo18.addEventListener("click",() => mostrarDetalles(articulo18));
articulo19.addEventListener("click",() => mostrarDetalles(articulo19));
articulo20.addEventListener("click",() => mostrarDetalles(articulo20));


/* FUNCION PARA MOSTRAR LOS DETALLES DEL ARTÍCULO */
function mostrarDetalles(articulo){
    detalles.innerHTML = 
    `<img src="${articulo.getAttribute("src")}" id="portadacarrito" alt="Portada">` +
    `<h2>${articulo.getAttribute("data-nombre")}</h2>` +
    `<p><strong>Fecha de publicación:</strong> ${articulo.getAttribute("data-fechadepublicacion")}</p>` +
    `<p><strong>Género:</strong> ${articulo.getAttribute("data-genero")}</p>` +
    `<p><strong>Capítulos:</strong> ${articulo.getAttribute("data-capitulos")}</p>` +
    `<p><strong>Sinopsis:</strong> ${articulo.getAttribute("data-sinopsis")}</p>` +
    '<button id="btncomprar">Añadir al carrito</button>';
    
    
    let btncomprar = document.getElementById("btncomprar");
    btncomprar.addEventListener("click", () => metercarrito(articulo));
}


function metercarrito(articuloseleccionado){
    carrito.innerHTML = 
    `<img src="${articuloseleccionado.getAttribute("src")}" id="portadacarrito" alt="Portada">`;
}