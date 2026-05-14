

console.log("Wasaa Wasaa");

var paconi = document.getElementById("titulo");

paconi.innerHTML = "Ensayo";

let NewYork = document.getElementById("NewYork");   

NewYork.addEventListener('mouseenter', TextImg);

function TextImg(){
   NewYork.innerText = "WASA";
   NewYork.innerHTML = "<img src='images/frieren.webp' alt='Frieren'> <p>WASA</p>/";

}
