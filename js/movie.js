'use strict';

let state = {
    search: '',
    movieList: {},
    movie:''
}

//initializes button for accepting input and sets up urls for OMDB access
let container = document.querySelector('#listing');
let detailContainer = document.querySelector('#details');
let inp = document.querySelector('input');
let button = document.querySelector('#add-button');
const urlTemplate = 'http://www.omdbapi.com/?apikey=ae5cb563&r=json&type=movie&s={name}';
const movieTemplate = 'http://www.omdbapi.com/?apikey=ae5cb563&r=json&type=movie&i={name}';
button.addEventListener('click', event => {
    state.search = inp.value;
    fetchMovieList(state.search);
    event.preventDefault();
})

function renderMovies(){
    // creaets a card for every movie
    state.movieList = state.movieList.Search;
    state.movieList.forEach(element => {
        createMovieCard(element);
    });
}
function togglerSpinner(){
    // toggles spinner for waiting
    document.querySelector('.fa-spinner').classList.toggle('d-none');
  }

  function renderError(err){
      // request has an error 
    let test = document.createElement(`p`);
    test.textContent = err.message;
    document.querySelector('#listing').appendChild(test);
  }

  function apiError(err){
    // api returns an error despite it going through
    let test = document.createElement(`p`);
    test.textContent = err;
    document.querySelector('#listing').appendChild(test);
  }

function fetchMovieList(term){
    // fetches a list of all movies with title
    container.innerHTML='';
    let url = urlTemplate.replace("{name}",term);
    togglerSpinner();
    let iter = fetch(url).then(function(response){
        return response.json();
    }).catch(function(err){
        renderError(err);
    }).then(function(response){
        if(response.Response =='False'){
            apiError(response.Error)
        }else{
            return response;
        }
    }).then(function(response){
        togglerSpinner();
        return response;
    });
    iter.then(response => state.movieList = response).then(()=>renderMovies())
    
}

function fetchMovie(term){
    // fetches details on a movie based off of IMDB id
    detailContainer.innerHTML='';
    let url = movieTemplate.replace("{name}",term);
    togglerSpinner();
    let iter = fetch(url).then(function(response){
        return response.json();
    }).catch(function(err){
        renderError(err);
    }).then(function(response){
        togglerSpinner();
        return response;
    });
    iter.then(response => state.movie = response).then(()=>renderMovie())
}




function createMovieCard(movieObj){
    // creates a card with movie poster and title from movie list
    let card = document.createElement('div');
    card.classList.add("card");
    let inCard = document.createElement('div');
    inCard.classList.add("card-body");
    let cardRow = document.createElement('div');
    cardRow.classList.add("row");
    let cardImgOut = document.createElement('div');
    let cardImg = document.createElement('img');
    let cardCol = document.createElement('div');
    cardCol.classList.add("col-sm");
    let cardTitle = document.createElement('h2');
    cardTitle.classList.add('card-title')
    container.appendChild(card);
    card.appendChild(inCard);
    inCard.appendChild(cardRow);
    cardRow.appendChild(cardImgOut);
    cardImgOut.appendChild(cardImg);
    cardRow.appendChild(cardCol);
    cardCol.appendChild(cardTitle);

    //creates loading while waiting for image load
    var image = cardImg;
    var downloadingImage = new Image();
    downloadingImage.onload = function(){
        image.src = this.src;   
    };
    downloadingImage.src = movieObj.Poster;
    cardImg.alt = 'Poster of {title}'.replace('{title}',movieObj.Title);
    cardImg.classList.add('card-img-bottom');
    cardRow.classList.add('d-flex');
    cardRow.classList.add('justify-content-center');
    cardTitle.textContent = movieObj.Title;
    card.setAttribute('data-id',movieObj.imdbID);
    card.addEventListener('click', function() {
        //allows card to be selected for more detailed information
        fetchMovie(this.getAttribute('data-id'));
    })
}



function renderMovie(){
    // creates card for movie details of currently selected card
    let card = document.createElement('div');
    card.classList.add("card");
    let inCard = document.createElement('div');
    inCard.classList.add("card-body");
    let cardRow = document.createElement('div');
    cardRow.classList.add("row");
    let cardImgOut = document.createElement('div');
    let cardImg = document.createElement('img');
    let cardCol = document.createElement('div');
    cardCol.classList.add("col-sm");
    let cardTitle = document.createElement('h2');
    cardTitle.classList.add('card-title');
    let cardText = document.createElement('p');
    cardText.classList.add('card-text');

    let title = state.movie.Title;
    let actor = state.movie.Actors;
    let released = state.movie.Released;
    let rated = state.movie.Rated;
    let irate = state.movie.imdbRating;
    let metarate = state.movie.Metascore;
    let director = state.movie.Director;
    let country = state.movie.Country;
    let lang = state.movie.Language;
    let awards = state.movie.Awards;
    let runtime = state.movie.Runtime;
    let genre = state.movie.Genre;
    let plot = state.movie.Plot;
    cardText.setAttribute('style', 'white-space: pre-wrap;');
    cardText.textContent = `
    Title: ${title}
    Actors: ${actor} 
    Released: ${released} 
    Rated: ${rated} 
    IMDB/Metacritic: ${irate}/${metarate}
    Director: ${director}
    Country(Language): ${country}(${lang})
    Awards: ${awards}
    Runtime: ${runtime}
    Genre: ${genre}
    Plot: ${plot}`
    
    
    detailContainer.appendChild(card);
    card.appendChild(inCard);
    inCard.appendChild(cardRow);
    cardRow.appendChild(cardImgOut);
    cardImgOut.appendChild(cardImg);
    cardRow.appendChild(cardCol);
    cardCol.appendChild(cardTitle);
    cardCol.appendChild(cardText);

    var image = cardImg;
    var downloadingImage = new Image();
    downloadingImage.onload = function(){
        image.src = this.src;   
    };
    downloadingImage.src = state.movie.Poster;
    cardImg.alt = 'Poster of {title}'.replace('{title}',title);
    cardImg.classList.add('card-img-bottom');
    cardRow.classList.add('d-flex');
    cardRow.classList.add('justify-content-center');
}