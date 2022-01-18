const KEY = 'AIzaSyBlY11rKVEPx04eGFSupfBgVWlVRkQYTVM',
      API = 'https://www.googleapis.com/books/',
      LINK = 'https://books.google.com/books/';

const input = document.querySelector('.main__search-input'),
    form = document.querySelector('.main__search-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    getData(`${API}v1/volumes?q=${searchCheck(input.value)}:keyes&key=${KEY}`, 'GET');
});

const title = document.querySelector('.main__books-title');

function getData(link, method) {
    document.querySelector('.main__books').innerHTML = '';

    fetch(link, {method:method})
        .then((response) => response.json())
        .then(({ items }) => {
            if (items) {
                for (let i = 0; i < items.length; i++) {
                    renderBookCard(items[i]);
                }
            } else {
               title.textContent = 'Ничего не найдено. Попробуйде еще раз!';
               document.querySelector('.main__books').append(title);
            }
        });
}

function checkArr(arr) {
    if (arr) return arr
    else return '';
}

function renderBookCard(item) {
    let img = `${LINK}content?id=${item.id}&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`;

    let newItem = document.createElement('div');
    newItem.classList.add('main__books-item');
    newItem.innerHTML = `
        <div class="main__books-img"><img src=${img} alt="preview"></div>
           <div class="main__books-descr">
              <div class="main__books-descr_up">
                  <div class="main__books-name">${item.volumeInfo.title}</div>
                  <div class="main__books-author">${checkArr(item.volumeInfo.authors)}</div>
              </div>
               <div class="main__books-descr_down">
                   <div class="main__books-year">${item.volumeInfo.publishedDate}</div>
                   <button class="main__books-btn">more</button>
               </div>
       </div>
    `;
    document.querySelector('.main__books').append(newItem);
}

function searchCheck(value) {
    return value.replace(/ /ig, '_');
}


