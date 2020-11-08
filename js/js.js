//Se tiene que registrar usuario

//Se tiene que loggear usuario

//Debe elegir carta
let primerCarta = prompt('Elija su primer carta');
console.log(primerCarta);

//FUNCION btn Npc
let imgg = document.getElementById('imgI');
function traerdatosUser() {
    //console.log('activamos la ft');
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'https://db.ygoprodeck.com/api/v7/cardinfo.php?type=XYZ%20Monster', true);
    xhttp.send();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let cardE = JSON.parse(this.responseText);
            //Atributo del ID del elemento
            imgD.setAttribute('src', cardE.data[primerCarta].card_images[0].image_url);
            console.log(cardE.data[primerCarta].card_images[0].image_url);
        }
    }
};

//FUNCION btn Npc
let img = document.getElementById('imgD');
function traerdatos() {
    //console.log('activamos la ft');
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'https://db.ygoprodeck.com/api/v7/cardinfo.php?type=XYZ%20Monster', true);
    xhttp.send();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let cardE = JSON.parse(this.responseText);
            var num = NumerosAleatorios(1, 420);
            //Atributo del ID del elemento
            imgD.setAttribute('src', cardE.data[num].card_images[0].image_url);
            console.log(cardE.data[num].card_images[0].image_url);
        }
    }
};

function NumerosAleatorios(min, max) {
    return Math.round(Math.random() * (max - min) + min);
 }