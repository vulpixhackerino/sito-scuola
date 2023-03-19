var accendi = document.getElementById("button1");
var spegni = document.getElementById("button2");
var plus = document.getElementById("button5");
var minus = document.getElementById("button6");
var auto = document.getElementById("button3");
var manual = document.getElementById("button4");
var currtemp = document.getElementById("tempterm");
var exttemp = document.getElementById("tempest");
const apiKey = 'bfcebbc8e4383c12a80c41528a252a0a';

accendi.addEventListener("click", accendifunc);
spegni.addEventListener("click", spegnifunc);
plus.addEventListener("click", increasefunc);
minus.addEventListener("click", decreasefunc);
auto.addEventListener("click", autofunc);
manual.addEventListener("click", manualfunc);
document.addEventListener("DOMContentLoaded", getinfofunc);

spegni.disabled = true;
accendi.disabled = false;
plus.disabled = true;
minus.disabled = true;
currtemp.innerHTML = "--.-°";

var tempvalue = 20.0;
var temperature = 0;

function getinfofunc(){
    navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        // Effettua una chiamata alla API di OpenWeatherMap per ottenere la temperatura
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
          .then(response => response.json())
          .then(data => {
            temperature = data.main.temp;
            exttemp.innerHTML = temperature + "°";
          })
          .catch(error => {
            alert('Si è verificato un errore durante la richiesta della temperatura', error);
          });
      }, (error) => {
        alert('Non è stato possibile ottenere la tua posizione', error);
      });
}

function spegnifunc(){
    console.log("Loggato spento");
    spegni.disabled = true;
    accendi.disabled = false;
    plus.disabled = true;
    minus.disabled = true;
    manual.disabled = true;
    auto.disabled = true;
    currtemp.innerHTML = "--.-°";
}

function accendifunc(){
    console.log("Loggato acceso");
    spegni.disabled = false;
    accendi.disabled = true;
    plus.disabled = false;
    minus.disabled = false;
    manual.disabled = true;
    auto.disabled = false;
    currtemp.innerHTML = tempvalue.toFixed(1) + "°";
}

function increasefunc(){
    tempvalue+=0.5;
    currtemp.innerHTML = tempvalue.toFixed(1) + "°";
}

function decreasefunc(){
    tempvalue-=0.5;
    currtemp.innerHTML = tempvalue.toFixed(1) + "°";
}

function autofunc(){
    if(temperature>24){
        tempvalue = (temperature + 30) / 3;
    }
    else tempvalue = (temperature + 30) / 2;
    currtemp.innerHTML = tempvalue.toFixed(1) + "°";
    plus.disabled = true;
    minus.disabled = true;
    auto.disabled = true;
    manual.disabled = false;
}

function manualfunc(){
    manual.disabled = true;
    plus.disabled = false;
    minus.disabled = false;
    auto.disabled = false;
}