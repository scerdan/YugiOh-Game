//FUNCION btn
document.getElementById('btn').addEventListener('click', traerdatos);
let img = document.getElementById('img');
function traerdatos() {
    //console.log('activamos la ft');
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', './json/cartas.json', true);
    xhttp.send();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let cardE = JSON.parse(this.responseText);
            //console.log(cardE[0].image_url);
            img.setAttribute('src', cardE[7].image_url)
        }
    }
};