'use strict';
let vehicles = [];
const currentImages = document.getElementsByClassName('img-resize');
const currentYear = (new Date()).getFullYear().toString();


function fetchJSONFile(path, callback) {
    let httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                let data = JSON.parse(httpRequest.responseText);
                if (callback) callback(data);
            }
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send();
}

fetchJSONFile('./js/vehicles.json', function (data) {
    vehicles = data;
    let nav = document.getElementsByClassName('nav')[0];
    document.getElementById('currYear').innerHTML = currentYear;

    //insert vehicles to navbar
    let counter = 0;
    for (let vehicle of vehicles) {
        counter++;

        // create li
        let li = document.createElement('li');
        li.className = 'nav-row';

        //create a
        let a = document.createElement('a');
        a.id = vehicle.code;
        a.innerText = vehicle.name;
        a.onclick = function () {
            changeCar(event, changeActiveButton)
        };
        // selecteaza prima masina din lista ca activa
        if (counter == 1) {
            a.className = 'active';
            changeCarData(vehicle);
        }
        // add a to li
        li.appendChild(a);

        //add li to aside nav bar
        nav.appendChild(li);
    }

});

function changeCar(event, callback) {
    let element = event.target;
    let vehicleIdx = parseInt(event.target.id.split('-')[1]) - 1;
    changeCarData(vehicles[vehicleIdx]);

    if (callback)
        callback(element);
}

function changeActiveButton(button) {
    let buttons = document.querySelector('.active');
    buttons.classList.remove('active');
    button.classList.add('active');
}

function changeCarData(newCar) {
    bindInnerTextById('name');

    if (newCar.images)
        replaceImages(newCar.images);

    bindInnerTextById('cp', newCar);
    bindInnerTextById('acceleratie', newCar);
    bindInnerTextById('vitezaMaxima', newCar);
    bindInnerTextById('combustibil', newCar);
    bindInnerTextById('emisiiCo2', newCar);
    bindInnerTextById('text1', newCar);
    bindInnerTextById('text2', newCar);
    bindInnerTextById('text3', newCar);
    bindInnerTextById('text4', newCar);
}

function bindInnerTextById(id, newItem) {
    let element = document.getElementById(id);
    if (element && newItem && newItem[id])
        element.innerText = newItem[id];
    else
        element.innerText = "";
}

function replaceImages(newImages) {
    for (let i = 0; i < currentImages.length; i++) {
        let currImg = currentImages[i];
        let parentNode = currImg.parentNode;
        currImg.remove();

        let newImg = document.createElement('img');
        newImg.alt = "...";
        newImg.className = "img-resize";
        newImg.src = '';

        if (newImages.length > i) {
            newImg.src = newImages[i];
        }
        parentNode.appendChild(newImg);

    }

}