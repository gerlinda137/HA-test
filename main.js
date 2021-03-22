'use strict';

(function () {

  document.body.insertAdjacentHTML('beforeend', '<div class="thread"><button class="thread__show-button"></button><ul class="thread-list"></ul></div>');
  const threadList = document.querySelector('.thread-list');
  threadList.insertAdjacentHTML('beforeend', '<template class="card-template"><li class="thread-list__item card"><h2 class="card__title"></h2><span class="card__author"></span><span class="card__date"></span><p class="card__description"></p><div class="card__data-wrapper"><a class="card__link">Читать дальше</a><span class="card__status">Не просмотрено</span></div></li></template>');
  const cardTemplate = document.querySelector('.card-template');

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
    z-index: 1000;
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

  const showButton = document.querySelector('.thread__show-button');
  showButton.textContent = 'Новости загружаются...';

  function dataReceived(json) {
    let data = json.data;

    const showNewsText = `Показать новости (${json.pagination.count})`;

    showButton.textContent = showNewsText;
    showButton.onclick = () => {
      const listShownClassName = 'thread-list--shown';
      threadList.classList.toggle(listShownClassName);
      if (threadList.classList.contains(listShownClassName)) {
        showButton.textContent = 'Скрыть новости';
      } else {
        showButton.textContent = showNewsText;
      }
    }

    for (let i = 0; i < data.length; i++) {
      let clonedCard = cardTemplate.content.cloneNode(true);
      let date = new Date(data[i].published_at);

      const url = data[i].url;

      clonedCard.querySelector('.card__title').textContent = data[i].title;
      clonedCard.querySelector('.card__author').textContent = data[i].source;
      clonedCard.querySelector('.card__date').textContent = date.toLocaleString('ru-RU', {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
      });
      clonedCard.querySelector('.card__description').textContent = data[i].description;

      function setCardViewed() {
        clonedCard.querySelector('.card__status').textContent = 'Просмотрено';
      }

      const linkElement = clonedCard.querySelector('.card__link');
      linkElement.href = url;
      linkElement.onclick = () => {
        localStorage.setItem(url, true);
        setCardViewed();
      }

      if (localStorage.getItem(url)) {
        setCardViewed();
      }

      threadList.appendChild(clonedCard);
    }
  }

  function fetchDataFailed(reason) {
    showButton.textContent = "Не получилось загрузить новости";
    showButton.style.pointerEvents = "none";
    console.log("news widget fetch data failed: " + reason);
  }

  function dateToApiString(date) {
    // it needs to be in YYYY-MM-DD format
    return date.toISOString().substring(0, 10);
  }

  // getting data for a month period
  let date = new Date();
  let currentDateString = dateToApiString(date);
  date.setMonth(date.getMonth() - 1);
  let prevDateString = dateToApiString(date);

  fetch(
      `http://api.mediastack.com/v1/news?access_key=e92871b85b366cebe9ca71acba1ba48b&countries=ru&languages=ru&date=${prevDateString},${currentDateString}&sort=published_desc&limit=5`
    )
    .then(function (resp) {
      return resp.json();
    })
    .then(dataReceived)
    .catch(fetchDataFailed);

})();