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
    }
};
//Se loguea los usuarios in sessionStorage
function acceso() {
    let mailV = document.getElementById('mail').value;
    let passV = document.getElementById('pass').value;
    if (mailV == sessionStorage.getItem('Mail') && passV == sessionStorage.getItem('Password')) {
        console.log('Estas adentro');
        // logUser = document.getElementById('cortina');
        // logUser.setAttribute('id', 'abierta');
        document.getElementById('cortina').style.cssText = "transition: all 2s ease;transform: translateY(-100vh);";

    } else {
        console.log('Debe estar registrado para poder Ingresar:');
    }
};
//Logout
function logout() {
    document.getElementById('cortina').style.cssText = "transition: all 2s ease;transform: translateY(0vh);";
    console.log('Vuelva Pronto!');
        sessionStorage.clear();
        // location.reload();
};

//FUNCION btn User
function traerdatosUser() {
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'https://db.ygoprodeck.com/api/v7/cardinfo.php?type=XYZ%20Monster', true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let cardE = JSON.parse(this.responseText);
            let primerCarta = NumerosAleatorios(1, 420);
            //Atributo del ID del elemento
            imgI.setAttribute('src', cardE.data[primerCarta].card_images[0].image_url);
            document.getElementById('imgI').style.cssText = "max-width: 98%; max-height: 98%;";
            nameCardUser = cardE.data[primerCarta].name;
            atkCardUser = cardE.data[primerCarta].atk;
            defCardUser = cardE.data[primerCarta].def;
            console.log('El ataque de su carta es: ' + atkCardUser);
            saveDatosUser();
        }
    }
};
//FUNCION btn Npc
function traerdatos() {
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'https://db.ygoprodeck.com/api/v7/cardinfo.php?type=XYZ%20Monster', true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cardE = JSON.parse(this.responseText);
            let num = NumerosAleatorios(1, 420);
            //Atributo del ID del elemento
            imgD.setAttribute('src', cardE.data[num].card_images[0].image_url);
            document.getElementById('imgD').style.cssText = "max-width: 98%; max-height: 98%;";
            nameCardNpc = cardE.data[num].name;
            atkCardNpc = cardE.data[num].atk;
            defCardNpc = cardE.data[num].def;
            console.log('El ataque de su oponente es: ' + atkCardNpc);
            saveDatosNpc();
        }
        // if (datosUser[1] > datosNPC[1]) {
        //     console.log('Ha ganado!')
        //     document.getElementById('imgD').style.cssText = "transition: all 2s ease;transform: rotate(360deg);";
        // } else if (datosUser[1] < datosNPC[1]) {
        //     console.log('Lo siento, Ha perdido!')
        // } else {
        //     console.log('Empate!')
        // }
    }
};

function NumerosAleatorios(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
// Datos de cartas seleccionadas
let datosNPC = [];
let datosUser = [];

function saveDatosNpc() {
    datosNPC.push(nameCardNpc, atkCardNpc, defCardNpc);
};

function saveDatosUser() {
    datosUser.push(nameCardUser, atkCardUser, defCardUser);
};

function animarAtk() {
	if (atkCardUser > atkCardNpc) {
            document.getElementById('imgD').style.cssText = "transform: scale(0.1); transition: all 2s ease";
	} else if (atkCardUser < atkCardNpc) {
            document.getElementById('imgI').style.cssText = "transform: scale(0.1); transition: all 2s ease";
	} else {
		console.log('Empateeee');
	}

}