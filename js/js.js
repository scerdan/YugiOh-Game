//Se tiene que registrar usuario

//Se tiene que loggear usuario

//Debe elegir carta
let primerCarta = prompt('Elija su primer carta');
traerdatosUser();
//FUNCION btn Npc
let imgg = document.getElementById('imgI');
function traerdatosUser() {
    //console.log('activamos la ft');
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', './json/cartas.json', true);
    xhttp.send();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let cardE = JSON.parse(this.responseText);
            //Atributo del ID del elemento
            imgI.setAttribute('src', cardE[primerCarta].image_url);
            console.log(cardE[primerCarta].atk);
        }
    }
};

//FUNCION btn Npc
document.getElementById('btn').addEventListener('click', traerdatos);
let img = document.getElementById('imgD');
function traerdatos() {
    //console.log('activamos la ft');
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', './json/cartas.json', true);
    xhttp.send();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let cardE = JSON.parse(this.responseText);
            var num = NumerosAleatorios(1, 23);
            //Atributo del ID del elemento
            let cartaNpc = imgD.setAttribute('src', cardE[num].image_url);
            console.log(cardE[num].atk);
        }
    }
};

function NumerosAleatorios(min, max) {
    return Math.round(Math.random() * (max - min) + min);
 }