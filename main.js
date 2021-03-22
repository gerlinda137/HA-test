function createContainer () {
  document.body.insertAdjacentHTML('beforeend','<div class="thread"><button class="thread__show-button"></button><ul class="thread-list"></ul></div>');
}
createContainer();

const threadList = document.querySelector('.thread-list');

function createCardTemplate () {
  threadList.insertAdjacentHTML('beforeend','<template class="card-template"><li class="thread-list__item card"><h2 class="card__title"></h2><span class="card__author"></span><span class="card__date"></span><p class="card__description"></p><div class="card__data-wrapper"><a class="card__link">Читать дальше</a><span class="card__status">Не просмотрено</span></div></li></template>');
}
createCardTemplate();

const cardTemplate = document.querySelector('.card-template');

function dateToString(date) {
  return date.toISOString().substring(0, 10);
}

let date = new Date();
let currentDateString = dateToString(date);

date.setMonth(date.getMonth() - 1);
let prevDateString = dateToString(date);

function jsonReceived(json) {
  console.log(json);
  let data = json.data;
  const showButton = document.querySelector('.thread__show-button');
  showButton.textContent = 'Показать новости (' + json.pagination.count + ')';
  showButton.onclick = () => {
    threadList.classList.toggle('thread-list--shown');
    if (threadList.classList.contains('thread-list--shown')) {
      showButton.textContent = 'Скрыть новости';
    } else {
      showButton.textContent = 'Показать новости (' + json.pagination.count + ')';
    }
  }

  for (let i = 0; i < data.length; i++) {
    let clonedCard = cardTemplate.content.cloneNode(true);
    let date = new Date(data[i].published_at);

    const url = data[i].url;

    clonedCard.querySelector('.card__title').textContent = data[i].title;
    clonedCard.querySelector('.card__author').textContent = data[i].source;
    clonedCard.querySelector('.card__date').textContent = date.toLocaleString('ru-RU', { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" });
    clonedCard.querySelector('.card__description').textContent = data[i].description;

    const linkElement = clonedCard.querySelector('.card__link');
    linkElement.href = url;
    linkElement.onclick = () => {
      localStorage.setItem(url, true);
    }
    
    if (localStorage.getItem(url)) {
      clonedCard.querySelector('.card__status').textContent = 'Просмотрено';
    }

    threadList.appendChild(clonedCard);
  }
}

function createStyles() {
  let style = document.createElement('style');
  style.innerHTML = `
  .thread {
    max-width: 300px;
    padding-top: 20px;
    width: 100%;
    position: absolute;
    right: 10px;
    top: 0;
    font-family: Arial, sans-serif;
    z-index: 100;
  }
  .thread__show-button {
    background: white; 
    border: 1ps back solid;
    border-radius: 5px;
    width: 100%;
    height: 30px;
    cursor: pointer;
  }
  .thread__show-button:hover {
    color: #8b2222;
  }
  .thread-list {
    display: none;
    flex-direction: column;
    style-list: none;
    padding-left: 0;
  }
  .thread-list--shown {
    display:flex;
  }
  .card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-self: center;
    margin: 0 auto;
    margin-bottom: 10px;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.1);
    color: #000000;
    font-size: 12px;
  }
  .card__title {
    font-family: $montserrat;
    font-weight: bold;
    font-size: 14px;
    line-height: 16px;
  }
  
  .card__author {
    color: #8b2222;
    margin-bottom: 5px;
  }
  
  .card__date {
    color: gray;
    position: relative;
    padding-left: 20px;
  }
  
  .card__date::before {
    content: '';
    position: absolute;
    width: 15px;
    height: 15px;
    background-image: url('https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/9-512.png');
    background-size: contain;
    background-repeat: no-repeat;
    top: -1px;
    left: 0;
  }
    
  .card__data-wrapper {
    display: flex;
    justify-content: space-between;
  }

  .card__link {
    color: inherit;
    text-decoration: underline;
    text-decoration-color: #8b2222;
  }

  .card__status {
    text-align: right;
    opacity: 0.4;
  }
  `;
  document.head.appendChild(style);
}
createStyles();
  
const fakeDataMode = true;

if (fakeDataMode) {

  const fakeResponse = `{
    "pagination": {
        "limit": 5,
        "offset": 0,
        "count": 5,
        "total": 2028
    },
    "data": [
        {
            "author": "",
            "title": "Обзор смартфона Samsung Galaxy S21 Ultra: вместо Galaxy Note",
            "description": "Лидируя среди моделей семейства, этот смартфон может похвастаться самой крутой начинкой, в основе которой топовый процессор с обильными запасами памяти и свежий системный софт. Наряду с 6,8-дюймовым Dynamic AMOLED 2...",
            "url": "https://www.vesti.ru/article/2539867",
            "source": "Vesti.ru",
            "image": "https://cdn-st1.rtr-vesti.ru/vh/pictures/b/313/313/2.jpg",
            "category": "general",
            "language": "ru",
            "country": "ru",
            "published_at": "2021-03-22T06:59:00+00:00"
        },
        {
            "author": null,
            "title": "Почему нужно брать Suzuki Jimny, когда есть Lada Niva Legend",
            "description": "Почему нужно брать Suzuki Jimny, когда есть Lada Niva Legend",
            "url": "https://rg.ru/2021/03/21/pochemu-nuzhno-brat-suzuki-jimny-kogda-est-lada-niva-legend.html",
            "source": "RG.ru Rossiyskaya Gazeta",
            "image": "https://cdnimg.rg.ru/img/content/206/07/65/form_photoreport_imageid_577293_d916a4a6425e9d81616069377.jpg",
            "category": "general",
            "language": "ru",
            "country": "ru",
            "published_at": "2021-03-21T16:08:36+00:00"
        },
        {
            "author": null,
            "title": "Сериал по The Last of Us будет отличаться от игры",
            "description": "Сериал по The Last of Us будет отличаться от игры",
            "url": "https://rg.ru/2021/03/20/serial-po-the-last-of-us-budet-otlichatsia-ot-igry.html",
            "source": "RG.ru Rossiyskaya Gazeta",
            "image": "https://cdnimg.rg.ru/img/content/206/18/26/1.jpeg",
            "category": "general",
            "language": "ru",
            "country": "ru",
            "published_at": "2021-03-20T13:46:49+00:00"
        },
        {
            "author": null,
            "title": "Apple готовит MacBook Pro с новым процессором M1X",
            "description": "Компания Apple выпустит новое поколение ноутбуков MacBook Pro, которые получат фирменный ARM-процессор. Об этом в Twitter сообщает LeaksApplePro.",
            "url": "https://ria.ru/20210319/apple-1602005156.html",
            "source": "RIA Novosti",
            "image": null,
            "category": "general",
            "language": "ru",
            "country": "ru",
            "published_at": "2021-03-19T12:55:06+00:00"
        },
        {
            "author": "",
            "title": "Гаспарян вышла в полуфинал St. Petersburg Ladies Trophy",
            "description": "Российская теннисистка Маргарита Гаспарян стала первой полуфиналисткой St. Petersburg Ladies Open. В матче 1/4 финала она обыграла свою соотечественницу Екатерину Александрову.",
            "url": "https://www.vesti.ru/article/2538860",
            "source": "Vesti.ru",
            "image": "https://cdn-st1.rtr-vesti.ru/vh/pictures/b/313/327/6.jpg",
            "category": "general",
            "language": "ru",
            "country": "ru",
            "published_at": "2021-03-19T11:48:00+00:00"
        }
    ]
  }`;

  jsonReceived(JSON.parse(fakeResponse));
} else {
    fetch(
      `http://api.mediastack.com/v1/news?access_key=90c0b0e1be04217e3d425e63fe390e00&countries=ru&languages=ru&date=${prevDateString},${currentDateString}&sort=published_desc&limit=5`
    )
    .then(function (resp) {
      return resp.json();
    })
    .then(jsonReceived)
    .catch(function () {
      // document.querySelector('.preloader').style.display = 'none';
      // document.querySelector('.weather-load-error').style.display = 'flex';
    });
  
}