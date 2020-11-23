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
        alert("Debe ingresar un correo o pass validos");
    } else {
        sessionStorage.setItem('Mail', correoUsuario);
        sessionStorage.setItem('Password', passUsuario);
        alert('Se ha registrado correctamente');
        $("#suc").animate({
            left: "40%",
        }, 1500, );
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
        traerdatosUser();
        traerdatos();
        $("<div class='tapete'></div>").appendTo("body");
        cerrarModal();
        crearCartas();
        $("#cortina").animate({top: "-100vh"}, 1250);
    } else {
        alert('Debe estar registrado para poder Ingresar:');
    }
};

function crearCartas() {
    $("<img class='carta' src='' id='imgA' onclick='carta(this)'>").appendTo($( ".tapete" ));
    $("<img class='carta' src='' id='imgB' onclick='carta(this)'>").appendTo($( ".tapete" ));
    $("<img class='carta' src='' id='imgC' onclick='carta(this)'>").appendTo($( ".tapete" ));
    $("<img class='carta' src='' id='imgD' onclick='carta(this)'>").appendTo($( ".tapete" ));
};

function carta(p) {
    let ccc = p.id;
    console.log(ccc);
    if (ccc === 'imgA') {
        // console.log(cartasUser[0]);
        $('#imgA').addClass('elegir');
        $('#imgB, #imgC, #imgD').addClass('ocultar');
        optionCard(0);
    } else if (ccc === 'imgB') {
        $('#imgB').addClass('elegir');
        $('#imgA, #imgC, #imgD').addClass('ocultar');
        optionCard(1);
    } else if (ccc === 'imgC') {
        $('#imgC').addClass('elegir');
        $('#imgA, #imgB, #imgD').addClass('ocultar');
        optionCard(2);
    } else if (ccc === 'imgD') {
        $('#imgD').addClass('elegir');
        $('#imgB, #imgC, #imgA').addClass('ocultar');
        optionCard(3);
    };
};

function optionCard(p) {
    console.log(cartasUser[p]);
    $('<div id="contenedor"></div>').appendTo($( ".tapete" ));
    $('<button>Defender</button>').appendTo($( "#contenedor" ));
    $('<button>Atacar</button>').appendTo($( "#contenedor" ));
    $('<p id="desc"></p>').appendTo($( "#contenedor" ));
    $('<h3></h3>').appendTo($( "#contenedor" ));
    $("p").html(cartasUser[p].desc);
    $("h3").html(cartasUser[p].name);
}

// function cartaNPC(p) {
//     let ccc = p.id;
//     console.log(ccc);
//     if (ccc === 'newN') {
//         document.getElementById('newN').style.cssText = "visibility: hidden;";
//         document.getElementById('imgNA').style.cssText = "visibility: visible;bottom: 0;box-shadow: 0px 0px 50px #ffff00;opacity: 1; height: 25rem; width: auto;position: absolute;";
//         $( "imgNA" ).addClass( "yourClass" );

//     };
//     //     console.log(cartasNpc[0]);
//     //     document.getElementById('newN1').style.cssText = "opacity: 0.25;";
//     //     document.getElementById('newN2').style.cssText = "opacity: 0.25;";
//     // } else if (ccc === 'newN1') {
//     //     document.getElementById('newN1').style.cssText = "visibility: hidden;";
//     //     document.getElementById('imgNA').style.cssText = "visibility: visible;bottom: 0;box-shadow: 0px 0px 50px #ffff00;opacity: 1; height: 25rem; width: auto;position: absolute;";
//     //     console.log(cartasNpc[1]);

//     // } else if (ccc === 'newN2') {
//     //     document.getElementById('newN2').style.cssText = "visibility: hidden;";
//     //     document.getElementById('imgNA').style.cssText = "visibility: visible;bottom: 0;box-shadow: 0px 0px 50px #ffff00;opacity: 1; height: 25rem; width: auto;position: absolute;";
//     //     console.log(cartasNpc[2]);

//     // };
// };

// function chocar() {
//     $('#imgA').animate({
//         left: "50%",
//     }, 500, );
//     $('#imgA').animate({
//         rotate: "45"
//     }, 1500, );
// }

//CREAR FUNCION QUE SELECCIONE NPC CARD Y LA MUESTRE
// Datos de cartas seleccionadas
let datosNPC = [];
let datosUser = [];
let cartasUser = [];
let cartasNpc = [];
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
            let cuartaCarta = NumerosAleatorios(1, 420);
            //Atributo del ID del elemento
            imgA.setAttribute('src', cardE.data[primerCarta].card_images[0].image_url);
            imgB.setAttribute('src', cardE.data[segundaCarta].card_images[0].image_url);
            imgC.setAttribute('src', cardE.data[terceraCarta].card_images[0].image_url);
            imgD.setAttribute('src', cardE.data[cuartaCarta].card_images[0].image_url);
            cartasUser.push(cardE.data[primerCarta])[0];
            cartasUser.push(cardE.data[segundaCarta])[1];
            cartasUser.push(cardE.data[terceraCarta])[2];
            cartasUser.push(cardE.data[cuartaCarta])[3];
            saveDatosUser();
        }
    }
};

function saveDatosUser() {
    datosUser.push(cartasUser);
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
            let cuartaCarta = NumerosAleatorios(1, 420);
            //Atributo del ID del elemento
            cartasNpc.push(cardE.data[primerCarta])[0];
            cartasNpc.push(cardE.data[segundaCarta])[1];
            cartasNpc.push(cardE.data[terceraCarta])[2];
            cartasNpc.push(cardE.data[terceraCarta])[3];
            saveDatosNpc();
        }
    };
};

function saveDatosNpc() {
    datosNPC.push(cartasNpc);
};

function NumerosAleatorios(min, max) {
    return Math.round(Math.random() * (max - min) + Math.random());
}

console.log(cartasNpc);
console.log(cartasUser);


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