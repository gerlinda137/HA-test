
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