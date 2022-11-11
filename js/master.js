//Dialogs
//Display continents countries
const time = document.createElement('dialog');
time.setAttribute('id', 'time');
const header = document.querySelector('header');
time.innerHTML += `<div class="header">
                    <p>Countries</p>
                    <i class="fa-solid fa-circle-xmark" id="exit"></i>
                 </div>`;
time.innerHTML += `<div id="container"></div>`
header.appendChild(time);
const container = document.getElementById("container");
console.log(container);
function getData(data){
    fetch(`https://worldtimeapi.org/api/timezone/${data}`).
    then((result)=>{
        let jsonData = result.json();
        return jsonData;
    }).then((jsonData)=>{
        for(let i=0;i<jsonData.length;i++){
            Country(jsonData[i]);
        }
    });
}
function Country(country){
    fetch(`https://worldtimeapi.org/api/timezone/${country}`).
    then((result)=>{
        let jsonData = result.json();
        return jsonData;
    }).then((jsonData)=>{
        let c = jsonData['timezone'].slice(1+ jsonData['timezone'].lastIndexOf('/'));
        let time = jsonData['datetime'].slice(jsonData['datetime'].indexOf('T')+1 , jsonData['datetime'].indexOf(':')+3)
        let date = jsonData['datetime'].slice(0, jsonData['datetime'].indexOf('T') );
        let Data = {
           'country': c,
           'time': time,
           'date': date
        };
        return Data;
    }).then((data)=>{
        const times = document.createElement('div');
        times.setAttribute('class', 'data');
        container.appendChild(times);
        times.innerHTML=`<p>${data['country']}</p> <p>${data['time']}</p> <p>${data['date']}</p>`;
    });
}

const explore = document.getElementById('explore');
explore.onclick=function () {
    const name = explore.getAttribute('data');
    getData(name);
    time.showModal();
}

const exit = document.getElementById('exit');
exit.onclick = ()=>{
    time.close();
    container.innerHTML = ``;
}

//nav Data
// about Dialog
const about= document.getElementById('about');
const aboutForm = document.createElement('dialog');
aboutForm.setAttribute('id' , 'form1');
header.appendChild(aboutForm);
aboutForm.innerHTML =  `<i class="fa-solid fa-circle-xmark" id="exitabout"></i>
                        <h3>What We Do?</h3>
                            <div class="components">
                                <div>
                                    <i class="fa-solid fa-earth-africa"></i>
                                    <p>Display all continents of<br> the world</p>
                                </div>
                                <div>
                                    <i class="fa-solid fa-passport"></i>
                                    <p>Description of all<br>continents</p>
                                </div>
                                <div>
                                    <i class="fa-solid fa-clock"></i>
                                    <p>Display the current time<br>in all countries</p>
                                </div>
                                <div>
                                    <i class="fa-solid fa-flag"></i>
                                    <p>Display all countries of<br>the continent</p>
                                </div>                     
                            </div>`;
about.onclick = ()=>{
    aboutForm.showModal();
}
const exitabout = document.getElementById('exitabout');
exitabout.onclick = ()=>{
    aboutForm.close();
}

//country 
let allContinent = ['Asia' , 'Africa','America','Atlantic','Australia','Europe','Pacific'];
const countries = document.getElementById('countries');
const countryForm = document.createElement('dialog');
countryForm.setAttribute('id' , 'form2');
header.appendChild(countryForm);
countryForm.innerHTML = `<i class="fa-solid fa-circle-xmark" id="exitcountry"></i> 
                        <div id="Data">
                        </div>`;
const Data = document.getElementById('Data');
function getAllCountry(){
    for(let i=0;i<allContinent.length;i++){
        fetch(`https://worldtimeapi.org/api/timezone/${allContinent[i]}`).
        then((result)=>{
            let jsonData = result.json();
            return jsonData;
        }).then((jsonData)=>{
            for(let j=0;j<jsonData.length;j++){
                let c = jsonData[j].slice(1+jsonData[j].lastIndexOf('/'));
                Data.innerHTML+=`<div><p>${c}</p></div>`;
            }
        });
    }
}
getAllCountry();
countries.onclick = ()=>{
    countryForm.showModal();
}
const exitcountry = document.getElementById('exitcountry');
exitcountry.onclick = ()=>{
    countryForm.close();
}