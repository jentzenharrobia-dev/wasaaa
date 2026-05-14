//creamos la variable
let btn = document.getElementById("btn");
let cajavideo = document.getElementById("cajavideo");

let btn1 =document.getElementById("btn1");
let btn2 =document.getElementById("btn2");
let limpiar = document.getElementById("limpiar");
let cajafoto = document.getElementById("cajafoto1");
let cajafoto2 = document.getElementById("cajafoto2");

//creamos el evento
btn.addEventListener('click', mostrar);
cajavideo.addEventListener('click', mostrarvideo);
btn1.addEventListener('click', mostrarfoto1);
btn2.addEventListener('click', mostrarfoto2);
limpiar.addEventListener('click', limpiarimg);

//creamos la función

function mostrar(){
    cajavideo.innerHTML = '<video autoplay muted> <source src="images/Videos/Cars 3 trailer.mp4" type="video/mp4"> </video>';
}

function mostrarvideo(){
    cajavideo.innerHTML = '<video> <source src="images/Videos/Cars 3 trailer.mp4" type="video/mp4"> </video>';
}

function mostrarfoto1(){
    cajafoto1.innerHTML = '<img src="images/tanya foto.webp">';
}

function mostrarfoto2(){
    cajafoto2.innerHTML = '<img src="images/tanya foto.webp">';
}

function limpiarimg(){
    cajafoto1.innerHTML = '';
    cajafoto2.innerHTML = '';
}


Swal.fire("Hola mundo");
Swal.fire({
title: "Spider-Man",text: "Héroe con sentidos arácnidos",
icon: "success"
});