function resetImage(event) {
    const old_img = event.currentTarget;
    old_img.src = 'https://iperborea.com/files/website/HeaderHomepage/iperborea-template-hp-desktop_kjc6Fhy.jpg';
}

function changeImage(event) {
    const new_main_img = event.currentTarget;
    new_main_img.src = 'https://iperborea.com/files/website/HeaderHomepage/iperborea-template-hp-desktop_v6CSXys.jpg';
    new_main_img.addEventListener('mouseout', resetImage);
}

const main_img = document.querySelector(".main-img");
main_img.addEventListener('mouseover', changeImage);


function onClickTurnRight() {
    const tabs = document.querySelectorAll('.temi-tab');

    for(const tab of tabs) {
        const index = parseInt(tab.dataset.index);

        if(index === 0) {
            tab.classList.add('hidden');
        }
        else if(index === 1) {
          tab.classList.remove('hidden');
        }
    }
}

const turnright_buttons = document.querySelectorAll('.turn-right');
for (const turnright_button of turnright_buttons) {
    turnright_button.addEventListener('click', onClickTurnRight);
}

function onClickTurnLeft() {
    const tabs = document.querySelectorAll('.temi-tab');

    for(const tab of tabs) {
        const index = parseInt(tab.dataset.index);

        if(index === 1) {
            tab.classList.add('hidden');
        }
        else if(index === 0) {
          tab.classList.remove('hidden');
        }
    }
}

const turnleft_buttons = document.querySelectorAll('.turn-left');
for (const turnleft_button of turnleft_buttons) {
    turnleft_button.addEventListener('click', onClickTurnLeft);
}

function onClickNascondi(event) {
    const nascondi_button = event.currentTarget;
    const news_testo = document.querySelector('.news-leggi-testo');
    const news_leggi = document.querySelector('.news-leggi');

    nascondi_button.classList.add('hidden');
    news_testo.classList.add('hidden');
    news_leggi.classList.remove('hidden');
}

function onClickLeggi(event) {
    const news_leggi = event.currentTarget;
    const news_testo = document.querySelector('.news-leggi-testo');
    const nascondi_button = document.querySelector('.nascondi-news');

    news_leggi.classList.add('hidden');
    news_testo.classList.remove('hidden');
    nascondi_button.classList.remove('hidden');

    nascondi_button.addEventListener('click', onClickNascondi);
}

const read_button = document.querySelector('.news-leggi');
read_button.addEventListener('click', onClickLeggi);

const ricezione_iscr = document.createElement('h1');
ricezione_iscr.textContent = 'CONGRATULAZIONI, SEI UFFICIALMENTE ISCRITTO ALLA NOSTRA NEWSLETTER!';
const exit = document.createElement('button');
exit.textContent = 'torna nella homepage';

function onClickExit() {
    const iscrizione_form = document.querySelector('.newsletter-iscrizione');
    const iscrizione_text = document.querySelector('.newsletter-iscrizione div');

    iscrizione_form.classList.add('hidden');
    iscrizione_form.removeChild(ricezione_iscr);
    iscrizione_form.removeChild(exit);
    iscrizione_text.classList.remove('hidden');
}

function onClickIscrizione() {
    const iscrizione_form = document.querySelector('.newsletter-iscrizione');
    const iscrizione_text = document.querySelector('.newsletter-iscrizione div');

    iscrizione_text.classList.add('hidden');
    iscrizione_form.appendChild(ricezione_iscr);
    iscrizione_form.appendChild(exit);

    exit.addEventListener('click', onClickExit);
}

function onClickNewsletter() {
    const iscrizione_form = document.querySelector('.newsletter-iscrizione');
    const iscriviti_button = document.querySelector('.iscriviti');
    const x = document.querySelector('.esci-newsletter');

    iscrizione_form.classList.remove('hidden');

    x.addEventListener('click', onClickExit);
    iscriviti_button.addEventListener('click', onClickIscrizione);
}

const newsletter_button = document.querySelector('.newsletter-link');
newsletter_button.addEventListener('click', onClickNewsletter);

// API YOUTUBE

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '260',
    width: '462,2', 
    videoId: '6xDezJD69A0',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  event.target.playVideo();
}


var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}


// API GOOGLE BOOKS

function onClickSearch() {
    const header = document.querySelector('#header');
    const main = document.querySelector('#main');
    const footer = document.querySelector('#footer');
    const search_page = document.querySelector('#full-page-search');

    header.classList.add('hidden');
    main.classList.add('hidden');
    footer.classList.add('hidden');

    search_page.classList.remove('hidden');
}

const search_button = document.querySelector('.cerca');
search_button.addEventListener('click', onClickSearch);

function OnClickSearchExit() {
    const header = document.querySelector('#header');
    const main = document.querySelector('#main');
    const footer = document.querySelector('#footer');
    const search_page = document.querySelector('#full-page-search');

    header.classList.remove('hidden');
    main.classList.remove('hidden');
    footer.classList.remove('hidden');

    search_page.classList.add('hidden');

    OnClickCancella();
}

const search_exit_button = document.querySelector('#full-page-search-exit');
search_exit_button.addEventListener('click', OnClickSearchExit);


function OnClickCancella() {
    const library_view = document.querySelector('#SearchResults-view');
    const search_input = document.querySelector('#search-input');

    library_view.innerHTML='';
    search_input.value='';
}

const cancella_button = document.querySelector('.cancella-button');
cancella_button.addEventListener('click', OnClickCancella);




function onJson(json) {
    console.log('Json ricevuto');
    console.log(json);
    const library = document.querySelector('#SearchResults-view');
    library.innerHTML = '';

    let num_results = json.totalItems;

    if(num_results > 10)
        num_results = 10;

    for (let i = 0; i < num_results; i++) {
        const item = json.items[i];

        const title = item.volumeInfo.title;
        const author = item.volumeInfo.authors;

        const book = document.createElement('div');
        book.classList.add('book');

        const book_cover = document.createElement('img');
        book_cover.src = item.volumeInfo.imageLinks.thumbnail;
        const book_caption = document.createElement('span');
        book_caption.textContent = title + ', ' + author;

        book.appendChild(book_cover);
        book.appendChild(book_caption);

        library.appendChild(book);
    }
}

function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
}

function gettoken(event)
{
    event.preventDefault();
  let params = {};
  let regex = /([^&=]+)=([^&]*)/g,m;

  while(m = regex.exec(location.href)){
      params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);    
    }

    if(Object.keys(params).length > 0){
        localStorage.setItem('authInfo', JSON.stringify(params));
      }

   window.history.pushState({},document.title,"/" + "mhw3/tester2.html");

  let info =  JSON.parse(localStorage.getItem('authInfo')); 
  console.log(JSON.parse(localStorage.getItem('authInfo')));
  console.log(info['access_token']);
 
    const search_input = document.querySelector('#search-input');
    const search_value = encodeURIComponent(search_input.value);
    console.log('Eseguo ricerca: ' + search_value);

    rest_url = 'https://www.googleapis.com/books/v1/volumes?q=' + search_value + '+inpublisher:iperborea&access_token=' + info['access_token'];
    console.log('URL: ' + rest_url);


  fetch(rest_url).then(onResponse).then(onJson); 
}



function oauthSignIn() {
    // Google's OAuth 2.0 endpoint for requesting an access token
    let oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
  
    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    let form = document.createElement('form');
    form.setAttribute('method', 'GET'); // Send as a GET request.
    form.setAttribute('action', oauth2Endpoint);
  
    // Parameters to pass to OAuth 2.0 endpoint.
    let params = {'client_id': '621563387339-jcj15rpojeu4nni7t91tahgt1pi4um3l.apps.googleusercontent.com',
                  'redirect_uri': 'http://127.0.0.1:5500/mhw3/tester2.html',
                  'response_type': 'token',
                  'scope': 'https://www.googleapis.com/auth/books',
                  'include_granted_scopes': 'true',
                  'state': 'try_sample_request'};
  
    // Add form parameters as hidden input values.
    for (var p in params) {
      var input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', p);
      input.setAttribute('value', params[p]);
      form.appendChild(input);
    }
  
    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
  }


function accessogoogle()
{
  oauthSignIn();
}


const logo_button = document.querySelector('.profile');
logo_button.addEventListener('click', accessogoogle);

const search_form = document.querySelector('#full-page-search-form');
search_form.addEventListener('submit', gettoken);




