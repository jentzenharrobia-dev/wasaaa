/**ZONA PARA LAS VARIABLES DEL CATÁLOGO */
let articulo001 = document.getElementById("001");
let articulo002 = document.getElementById("002");
let articulo003 = document.getElementById("003");
let articulo004 = document.getElementById("004");
let articulo005 = document.getElementById("005");
let articulo006 = document.getElementById("006");
let articulo007 = document.getElementById("007");
let articulo008 = document.getElementById("008");
let articulo009 = document.getElementById("009");
let articulo010 = document.getElementById("010");
let articulo011 = document.getElementById("011");
let articulo012 = document.getElementById("012");
let articulo013 = document.getElementById("013");
let articulo014 = document.getElementById("014");
let articulo015 = document.getElementById("015");
let articulo016 = document.getElementById("016");
let articulo017 = document.getElementById("017");
let articulo018 = document.getElementById("018");
let articulo019 = document.getElementById("019");
let articulo020 = document.getElementById("020");


/**ZONA PARA LAS VARIABLES DEL DOM(LAS CAJAS)*/
let cajaDetalles = document.getElementById("det");
let cajaCarrito = document.getElementById("zonaCarrito");
const abrirCartera = document.getElementById("accesoCartera");
const cerrarCartera = document.getElementById("cerrarCartera");
const fondoCartera = document.getElementById("fondoCartera");
const saldoVistaGeneral = document.getElementById("saldoVistaGeneral")


/**ZONA PARA LAS VARAIBLES DE LA CARTERA */
const inpSaldo = document.getElementById("saldo");
const inpIngreso = document.getElementById("ingreso");
const slcMoneda = document.getElementById("moneda");
const btnIngresarCartera = document.getElementById("ingresarCartera");
const resumenCartera = document.getElementById("resumenCartera");


/*Añadimos eventos a los elementos que corresponda*/
articulo001.addEventListener('click',()=>mostrarDetalles(articulo001));
articulo002.addEventListener('click',()=>mostrarDetalles(articulo002));
articulo003.addEventListener('click',()=>mostrarDetalles(articulo003));
articulo004.addEventListener('click',()=>mostrarDetalles(articulo004));
articulo005.addEventListener('click',()=>mostrarDetalles(articulo005));
articulo006.addEventListener('click',()=>mostrarDetalles(articulo006));
articulo007.addEventListener('click',()=>mostrarDetalles(articulo007));
articulo008.addEventListener('click',()=>mostrarDetalles(articulo008));
articulo009.addEventListener('click',()=>mostrarDetalles(articulo009));
articulo010.addEventListener('click',()=>mostrarDetalles(articulo010));
articulo011.addEventListener('click',()=>mostrarDetalles(articulo011));
articulo012.addEventListener('click',()=>mostrarDetalles(articulo012));
articulo013.addEventListener('click',()=>mostrarDetalles(articulo013));
articulo014.addEventListener('click',()=>mostrarDetalles(articulo014));
articulo015.addEventListener('click',()=>mostrarDetalles(articulo015));
articulo016.addEventListener('click',()=>mostrarDetalles(articulo016));
articulo017.addEventListener('click',()=>mostrarDetalles(articulo017));
articulo018.addEventListener('click',()=>mostrarDetalles(articulo018));
articulo019.addEventListener('click',()=>mostrarDetalles(articulo019));
articulo020.addEventListener('click',()=>mostrarDetalles(articulo020));


/**Eventos para las ventanas modales*/
abrirCartera.addEventListener("click",()=>mostrarVentanaModal(fondoCartera,true));
cerrarCartera.addEventListener("click",()=>mostrarVentanaModal(fondoCartera,false));
/**Eventos para la cartera*/
btnIngresarCartera.addEventListener("click",ingresarSaldo);


/**COMPROBACIONES INICIALES */
    //1. Si el saldo está vacío le damos como valor un 0
    //Las "" se utilizan para identificar que NO HAY NADA DENTRO
    if(inpSaldo.value==""){
        //3. Si no hay nada lo ponemos a 0
        inpSaldo.value = "0";
        //..también en el resumen de la vista general
        saldoVistaGeneral.textContent=`💰0 ${slcMoneda.value}`;
    }
    //2. Al principio eliminamos el texto del h1
    //En textContent se almacena el texto de h1, p, b, span, etc...
    if(resumenCartera.textContent=="TEXTO RESUMEN"){
        resumenCartera.textContent="";
    }


/**FUNCIONES*/
function ingresarSaldo(){
    //1. Guardamos el saldo
    let saldoActual = Number(inpSaldo.value);
    //Validamos que el valor del ingreso NO SEA menor que 0
    if(Number(inpIngreso.value)<0){
        resumenCartera.innerText="El saldo no puede ser negativo";
        return;
    }else if(Number(inpIngreso.value)>500){
        resumenCartera.innerText="El ingreso no puede ser superior a 500";
        return;
    }
    //2. Sumamos la cantidad a ingresar al saldo
    saldoActual= saldoActual + Number(inpIngreso.value);
    //3. Mostramos el nuevo saldo en el input y en el H1
    inpSaldo.value=saldoActual;
    resumenCartera.innerText=`Saldo:${saldoActual}${slcMoneda.value}`;
    saldoVistaGeneral.textContent=`💰${saldoActual} ${slcMoneda.value}`;
}




function mostrarVentanaModal(ventana,encendido){
    /**Condicional simple: if(condición){}else{}*/
    if(encendido===true){
        /**Si es TRUE agregamos el class .activo*/
        ventana.classList.add("activo");
    }else{/**Se entra cuando no se cumple la condición */
        /**Si es FALSO elimino el class .activo*/
        ventana.classList.remove("activo");
        //También limpiamos el inpIngreso y el h1 resumen
        inpIngreso.value="";
        resumenCartera.textContent="";
    }
}




function mostrarDetalles(articulo){
    cajaDetalles.innerHTML = `
    <section class="panelDetalles">
                <section class="columnaIzq">
                    <h1>${articulo.getAttribute("data-nombre")}</h1>
                    <img src="${articulo.getAttribute("src")}" />
                </section>
                <section class="columnaDrch">
                  <p class="pNormal">${articulo.getAttribute("data-autor")}</p>
                  <p class="pNormal">Editorial: ${articulo.getAttribute("data-editorial")}</p>
                  <p class="pScrolleable">${articulo.getAttribute("data-sinopsis")}</p>
                  <p class="pNormal">Género: ${articulo.getAttribute("data-genero")}</p>
                  <p class="pNormal">P.V.P ${articulo.getAttribute("data-precio")}</p>
                  <div id="btnComprar" class="comprar">Comprar!</div>
                </section>
                </section>`;
    /*Ahora, guardo el nuevo botón creado */
    let btnComprar = document.getElementById("btnComprar");
    /*Añadimos el evento al botón que manda la propia info del articulo*/
    btnComprar.addEventListener('click',()=>anadirCarrito(articulo));
}


//Esta función lee la info del articulo comprado y la enseña
function anadirCarrito(articuloSeleccionado){
    // Creamos un div dinámicamente
    const nuevoDIV = document.createElement('div');
    //Asignar una clase dinámicamente
    nuevoDIV.classList.add("articuloCarrito");
    //Creamos en su interior una imagen
    nuevoDIV.innerHTML=`<img class="imgPequenaCarrito" src="${articuloSeleccionado.getAttribute("src")}"
                    data-nombre="${articuloSeleccionado.getAttribute("data-nombre")}"
                    data-genero="${articuloSeleccionado.getAttribute("data-genero")}"
                    data-editorial="${articuloSeleccionado.getAttribute("data-editorial")}"
                    data-autor="${articuloSeleccionado.getAttribute("data-autor")}"
                    data-precio="${articuloSeleccionado.getAttribute("data-precio")}"
                    data-sinopsis="${articuloSeleccionado.getAttribute("data-sinopsis")}"
                    >`
    //Por último, agregamos este DIV al panel inferior
    //AppenChild(hijo) permite insertar en un elemento un nuevo hijo
    cajaCarrito.appendChild(nuevoDIV);                
}



