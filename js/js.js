'use strict';

//Menu animado
let menu = document.querySelectorAll('#menu')[0];
let fondo = document.querySelectorAll('nav')[0];
menu.addEventListener('click', function (e) {
    e.preventDefault();
    fondo.style.visibility = 'visible';
});
window.addEventListener('click', function (e) {
    if (e.target == fondo) {
        cerrarModal();
    }
});

function cerrarModal() {
    fondo.style.visibility = 'hidden';
}
//Se registra los usuarios in sessionStorage
function enviar() {
    let correoUsuario = document.getElementById("mail").value;
    let passUsuario = document.getElementById("pass").value;
    if (correoUsuario == '' || passUsuario == '') {
        console.log("Debe ingresar un correo o pass validos");
    } else {
        sessionStorage.setItem('Mail', correoUsuario);
        sessionStorage.setItem('Password', passUsuario);
        console.log('Se ha registrado correctamente');
        $("#suc").animate({
            left: "40%",
        }, 1000, );
        $("#suc").animate({
            opacity: '0',
        }, 1500, );
    }
};
//Se loguea los usuarios in sessionStorage
function acceso() {
    let mailV = document.getElementById('mail').value;
    let passV = document.getElementById('pass').value;
    if (mailV == sessionStorage.getItem('Mail') && passV == sessionStorage.getItem('Password')) {
        console.log('Estas adentro');
        cerrarModal();
        document.getElementById('cortina').style.cssText = "transition: all 2s ease;transform: translateY(-100vh);";
        crearCartas();
    } else {
        console.log('Debe estar registrado para poder Ingresar:');
    }
};

function crearCartas() {
    $("<img class='carta' src='' id='imgA' onclick='carta(this)'>").appendTo("body");
    $("<img class='carta' src='' id='imgB' onclick='carta(this)'>").appendTo("body");
    $("<img class='carta' src='' id='imgC' onclick='carta(this)'>").appendTo("body");

    $("<div class='cartaNpc' id='newN'><p>3</p><img src='' id='imgNA'></div>").appendTo("body");
    $("<div class='cartaNpc' id='newN1'><p>2</p><img src='' id='imgNB'></div>").appendTo("body");
    $("<div class='cartaNpc' id='newN2'><p>1</p><img src='' id='imgNC'></div>").appendTo("body");


    document.getElementById('imgA').style.cssText = "bottom: 0; left: 2%;";
    document.getElementById('imgB').style.cssText = "bottom: 0; left: 22%;";
    document.getElementById('imgC').style.cssText = "bottom: 0; left: 42%;";

    document.getElementById('newN').style.cssText = "top: 15vh; right: 2%; background-color: black; border:1px solid white;";
    document.getElementById('imgNA').style.cssText = "width: 100%; height: 100%; visibility: hidden;";
    document.getElementById('newN1').style.cssText = "top: 15vh; right: 20%; background-color: black; border:1px solid white;";
    document.getElementById('imgNB').style.cssText = "width: 100%; height: 100%;  visibility: hidden;";
    document.getElementById('newN2').style.cssText = "top: 15vh; right: 38%; background-color: black; border:1px solid white;";
    document.getElementById('imgNC').style.cssText = "width: 100%; height: 100%;  visibility: hidden;";

    traerdatosUser();
    traerdatos();
    //URGENTE AGREGAR 10 cartas con appendTo
}


function carta() {
    // let idSeleccionado = e.id;
    // document.getElementById(idSeleccionado).style.cssText = "bottom: 20vh; left: 2%;";
    // if (idSeleccionado === 'imgA') {
    //     console.log('Ha elegido la carta: '+datosUser[0]);
    // } else if (idSeleccionado === 'imaB') {
    //     console.log('Ha elegido la carta: '+datosUser[1]);
    // } else if (idSeleccionado === 'imaC') {
    //     console.log('Ha elegido la carta: '+datosUser[2]);
    // };
};

//FUNCION btn User
function traerdatosUser() {
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'https://db.ygoprodeck.com/api/v7/cardinfo.php?type=XYZ%20Monster', true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let cardE = JSON.parse(this.responseText);
            let primerCarta = NumerosAleatorios(1, 420);
            let segundaCarta = NumerosAleatorios(1, 420);
            let terceraCarta = NumerosAleatorios(1, 420);
            //Atributo del ID del elemento
            imgA.setAttribute('src', cardE.data[primerCarta].card_images[0].image_url);
            imgB.setAttribute('src', cardE.data[segundaCarta].card_images[0].image_url);
            imgC.setAttribute('src', cardE.data[terceraCarta].card_images[0].image_url);

            cartasUser.push(cardE.data[primerCarta])[0];
            cartasUser.push(cardE.data[segundaCarta])[1];
            cartasUser.push(cardE.data[terceraCarta])[3];
            saveDatosUser();
        }
    }
};
//FUNCION btn Npc
function traerdatos() {
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'https://db.ygoprodeck.com/api/v7/cardinfo.php?type=XYZ%20Monster', true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let cardE = JSON.parse(this.responseText);
            let primerCarta = NumerosAleatorios(1, 420);
            let segundaCarta = NumerosAleatorios(1, 420);
            let terceraCarta = NumerosAleatorios(1, 420);
            //Atributo del ID del elemento
            imgNA.setAttribute('src', cardE.data[primerCarta].card_images[0].image_url);
            imgNB.setAttribute('src', cardE.data[segundaCarta].card_images[0].image_url);
            imgNC.setAttribute('src', cardE.data[terceraCarta].card_images[0].image_url);
            cartasNpc.push(cardE.data[primerCarta])[0];
            cartasNpc.push(cardE.data[segundaCarta])[1];
            cartasNpc.push(cardE.data[terceraCarta])[3];
            saveDatosNpc();
        }
    };
};

function NumerosAleatorios(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
// Datos de cartas seleccionadas
let datosNPC = [];
let datosUser = [];
let cartasUser = [];
let cartasNpc = [];
console.log(datosNPC);
console.log(datosUser);

function saveDatosNpc() {
    datosNPC.push(cartasNpc);
};

function saveDatosUser() {
    datosUser.push(cartasUser);
};

// function animarAtk() {
//     // if (atkCardUser > atkCardNpc) {
//     //     document.getElementById('imgD').style.cssText = "transform: scale(0.1); transition: all 2s ease";
//     // } else if (atkCardUser < atkCardNpc) {
//     //     document.getElementById('imgI').style.cssText = "transform: scale(0.1); transition: all 2s ease";
//     // } else {
//     //     console.log('Empateeee');
//     // }
//     $( "<div class='new'>aaaaaa</div>" ).appendTo( "body" );
//  //URGENTE AGREGAR 10 cartas con appendTo
// }

function logout() {
    document.getElementById('cortina').style.cssText = "transition: all 2s ease;transform: translateY(0vh);";
    console.log('Vuelva Pronto!');
    sessionStorage.clear();
    location.reload();
};