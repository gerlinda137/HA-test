
function createContainer () {
  document.body.insertAdjacentHTML('beforeend','<div class="thread"><ul class="thread-list"></ul></div>');
}
createContainer();

const threadList = document.querySelector('.thread-list');

function createCardTemplate () {
  threadList.insertAdjacentHTML('beforeend','<template class="card-template"><li class="thread-list__item card"><h2 class="card__title"></h2><span class="card__author"></span><span class="card__date"></span><p class="card__description"></p><div class="card__data-wrapper"><a class="card__link">Читать дальше</a><span class="card__status">Не просмотрено</span></div></li></template>');
}
createCardTemplate();

const cardTemplate = document.querySelector('.card-template');

fetch(
  `http://api.mediastack.com/v1/news?access_key=90c0b0e1be04217e3d425e63fe390e00&countries=ru&languages=ru`
)
  .then(function (resp) {
    return resp.json();
  })
  .then(function (json) {
    console.log(json);
    let data = json.data;

    for (let i = 0; i <= data.length; i++) {
      let clonedCard = cardTemplate.content.cloneNode(true);
      clonedCard.querySelector('.card__title').textContent = data[i].title;
      clonedCard.querySelector('.card__author').textContent = data[i].source;
      clonedCard.querySelector('.card__date').innerHTML = data[i].published_at;
      clonedCard.querySelector('.card__description').textContent = data[i].description;
      clonedCard.querySelector('.card__link').href = data[i].url;

      threadList.appendChild(clonedCard);
    }
  })
  .catch(function () {
    // document.querySelector('.preloader').style.display = 'none';
    // document.querySelector('.weather-load-error').style.display = 'flex';
  });

  function createStyles() {
    let style = document.createElement('style');
    style.innerHTML = `
    .thread {
      max-width: 300px;
      padding-top: 20px;
      width: 100%;
      position: sticky;
      right: 0;
      bottom: 0;
      background-color: #ffffff;
      font-family: Arial, sans-serif;
    }
    .thread-list {
      display: flex;
      flex-direction: column;
      style-list: none;
      padding-left: 0;
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
      top: 0;
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
  