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
const cerrarModal = () => fondo.style.visibility = 'hidden';
//Se registra los usuarios in sessionStorage
const enviar = function () {
    let correoUsuario = document.getElementById("mail").value;
    let passUsuario = document.getElementById("pass").value;
    if (correoUsuario == '' || passUsuario == '') {
        alert("Debe ingresar un correo o pass validos");
    } else {
        localStorage.setItem('Mail', correoUsuario);
        localStorage.setItem('Password', passUsuario);
        $("#suc").animate({
            left: "40%",
        }, 500, );
        $("#suc").animate({
            opacity: '0',
        }, 1500, );
    }
};
//Se loguea los usuarios in sessionStorage
const acceso = function () {
    let mailV = document.getElementById('mail').value;
    let passV = document.getElementById('pass').value;
    if (mailV == localStorage.getItem('Mail') && passV == localStorage.getItem('Password')) {
        console.log('Estas adentro');
        traerDatos();
        $("header").children("img").remove();
        $("<div class='tapete'></div>").appendTo("body");
        cerrarModal();
        $('<h2>Elige tu primer carta!</h2>').appendTo("body");
        $("#cortina").animate({
            top: "-100vh"
        }, 1250);
    } else {
        alert('Debe estar registrado para poder Ingresar:');
    }
};
const pedirCartas = () => {
    let numCartaAzar = NumerosAleatorios(0, 12);
    const imgCarta = document.createElement('img');
    imgCarta.src = cartasI[numCartaAzar].card_images[0].image_url;
    imgCarta.alt = "Carta YuGiHo";
    imgCarta.className = 'carta';
    document.getElementsByClassName('tapete')[0].append(imgCarta);
    imgCarta.onclick = function() {
        alert("Soy un botón");
      }
};

const carta = (p) => {
    let ccc = p.id;
    if (ccc === 'imgA') {
        $('#imgA').addClass('elegir');
        $('#imgB, #imgC, #imgD').remove();
        optionCard(0);
        $('#imgA').prop("onclick", null);
    } else if (ccc === 'imgB') {
        $('#imgB').addClass('elegir');
        $('#imgA, #imgC, #imgD').remove();
        $('#imgB').prop("onclick", null);
        optionCard(1);
    } else if (ccc === 'imgC') {
        $('#imgC').addClass('elegir');
        $('#imgA, #imgB, #imgD').remove();
        $('#imgC').prop("onclick", null);
        optionCard(2);
    } else if (ccc === 'imgD') {
        $('#imgD').addClass('elegir');
        $('#imgB, #imgC, #imgA').remove();
        $('#imgD').prop("onclick", null);
        optionCard(3);
    };
    $("body").children("h2").remove();
};

const optionCard = (p) => {
    $('<div id="contenedor"></div>').appendTo($(".tapete"));
    $('<h4 onclick="atkOrDef(this)">Continuar a la carta de su oponente...</h4>').appendTo($("#contenedor"));
    $('<p id="desc"></p>').appendTo($("#contenedor"));
    $('<h3></h3>').appendTo($("#contenedor"));
    $("p").html(cartasUser[p].desc);
    $("h3").html(cartasUser[p].name);
    cartasElegidas.push(cartasUser[p], cartasNpc[0]);
}

//CREAR FUNCION QUE SELECCIONE NPC CARD Y LA MUESTRE
// Datos de cartas seleccionadas
let cartasI = [];
let cartasElegidas = [];

const traerDatos = function () {
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'https://db.ygoprodeck.com/api/v7/cardinfo.php?type=XYZ%20Monster', true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let card = JSON.parse(this.responseText);
            for (let i = 0; i <= 12 ; i++) {
                let numAzar = NumerosAleatorios(i, 420);
                cartasI.push(card.data[numAzar])[i];
            }
        }
    };
};

let NumerosAleatorios = (min, max) => Math.round(Math.random() * (max - min) + +Math.random(max));
console.log(cartasI);

const atkOrDef = () => {
    $("#contenedor").empty();
    $("<img class='carta elegir' src='' id='imgNpc'>").appendTo($(".tapete"));
    imgNpc.setAttribute('src', cartasNpc[0].card_images[0].image_url);
    $('<p id="ver" class="selectVer">Atk --></p>').appendTo("body");
    $('<p id="verDef" class="selectVer"><-- Def</p>').appendTo("body");
    let btnAtacar = document.getElementById('ver');
    let btnDefender = document.getElementById('verDef');
    btnAtacar.addEventListener('click', function () {
        userAction(cartasElegidas[0].atk, cartasElegidas[1].atk);
    });
    btnDefender.addEventListener('click', function () {
        userAction(cartasElegidas[0].def, cartasElegidas[1].def);
    });
}
const userAction = function (a, b) {
    if (a === b) {
        console.log('EMPATE!');
        $('<div id="banner"></div>').appendTo("body");
        $('<p>EMPATE</p>').appendTo($("#banner"));
        bannerAnimate(0);
    } else if (a > b) {
        console.log(' HA GANADO!');
        $('<div id="banner"></div>').appendTo("body");
        $('<p>HA GANADO!!!</p>').appendTo($("#banner"));
        bannerAnimate(1);
    } else if (a < b) {
        $('<div id="banner"></div>').appendTo("body");
        $('<p>HA PERDIDO!</p>').appendTo($("#banner"));
        bannerAnimate(2);
    };
};
        //Pasar a la siguiente carta (hasta agotar las 4)
const bannerAnimate = (a) => {
        $('#banner').fadeOut(2500, function () {
        if (a === 0) {
            siguiente();
        } else if (a === 1) {
            siguiente();
        } else if (a === 2) {
            siguiente();
        }
    });
}

let siguiente = () => {
    $(".tapete, .selectVer").remove();
    $('<p id="siguiente">- vuelva pronto... -</p>').appendTo("body");
    let betSiguiente = document.getElementById('siguiente');
    betSiguiente.addEventListener('click', function () {
        logout();
    });
}

const logout = () => {
    document.getElementById('cortina').style.cssText = "transition: all 2s ease;transform: translateY(0vh);";
    console.log('Vuelva Pronto!');
    sessionStorage.clear();
    location.reload();
};