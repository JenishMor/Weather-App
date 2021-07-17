// url = "https://api.openweathermap.org/data/2.5/weather?q=surat&appid=639ea0cea1d927d4f4cd906411cbb5e0";

let cont = document.getElementById('cont');
let maincont = document.getElementById('main-cont');
let load = document.getElementById('load');
let btn = document.getElementById('btn');
let city = document.querySelector('input');

let desc = document.getElementById('desc');
let temp = document.getElementById('temp');
let feel = document.getElementById('feel');
let min = document.getElementById('min');
let max = document.getElementById('max');
let pressure = document.getElementById('pressure');
let cld = document.getElementById('cld');

btn.addEventListener('click', fetchData);
load.style.display = 'none';

function fetchData() {
    let city_name = city.value;
    // console.log('You clicked on btn');

    const xhr = new XMLHttpRequest();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=639ea0cea1d927d4f4cd906411cbb5e0`;
    xhr.open('GET', url, true);
    // console.log(xhr.status);

    xhr.onload = function () {
        // load.innerHTML = `Wait....`;
        load.style.display = 'block';
        // console.log('Started onload function');
        setTimeout(() => {
            if (this.status === 200) {
                maincont.innerHTML = "";
                cont.style.display = 'block';
                let obj = JSON.parse(this.responseText);

                curr_temp = obj.main.temp - 273;
                min_temp = obj.main.temp_min - 273;
                max_temp = obj.main.temp_max - 273;
                pres = obj.main.pressure;
                feellike = obj.main.feels_like - 273;
                cloud = obj.clouds.all;
                desp = obj.weather[0].description;

                desc.innerHTML = `${desp}`;
                temp.innerHTML = `${Math.ceil(curr_temp)} °C`;
                feel.innerHTML = `${Math.round(feellike)} °C`;
                min.innerHTML = `${Math.ceil(min_temp)} °C`;
                max.innerHTML = `${Math.ceil(max_temp)} °C`;
                pressure.innerHTML = `${pres}`;
                cld.innerHTML = `${cloud} %`;

            }
            else {
                cont.style.display = 'none';
                maincont.innerHTML = `<h2 style="color: black;">Some Error Occured...</h2>`;
                console.log('Error ocurred');
            }
            // load.innerHTML = "";
            load.style.display = 'none';
        }, 1000);
    }
    xhr.send();
}


