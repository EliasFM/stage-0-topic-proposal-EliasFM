import React, { Component } from 'react';

import './App.css';
function renderError(err){
    // request has an error 
    return(<p>{err.message}</p>);
  }
  
  function apiError(err){
  // api returns an error despite it going through
    return(<p>{err}</p>);
  }
  
  

class Movie extends Component {
// Creates new content for the card from IMDB's database, and allows it to flipped back to the original
    constructor(props){
        super(props);
        this.handleChildClick = this.handleChildClick.bind(this);
        this.state = {movie: undefined,load:false,temp:undefined,show:true};
    }

    async componentDidMount(){
        const movieTemplate = 'https://www.omdbapi.com/?apikey=ae5cb563&r=json&type=movie&i={name}';
        let cardId = this.props.movieId;
        // let cardId = 338952;
        let movieName = await fetch("https://api.themoviedb.org/3/movie/" + cardId + "?api_key=5998a49a96a6ec70146d23cc8f3193eb")
            .catch(renderError)
            .then(function(response) {return response.json()})
        //loaded imdbID  
        let url = movieTemplate.replace("{name}",movieName.imdb_id);
        let iter = fetch(url).then(function(response){
            return response.json();
        }).catch(function(err){
            renderError(err);
        }).then(function(response){
        if(response.Response ==='False'){
            apiError(response.Error)
        }else{
            return response;
        }
        }).then(function(response){
            return response;
        });
        //loaded imdb information from omdb
        iter.then(response =>this.setState({movie:response})).then(()=>this.setState({load:true}));

    }
    handleChildClick(e){
        //calls back up to parent
        this.props.handleChildClick(e);
    }

    render() {
        if(this.state.load){
            return (
                <div onClick={this.handleChildClick} aria-label='click card to view general details'>
                    <img alt= {'Poster of {title}'.replace('{title}',this.state.movie.Title)}  src={this.state.movie.Poster}/>
                    <h4>    {this.state.movie.Title}</h4>
                    <p>
                        Actors: {this.state.movie.Actors} <br></br>
                        Released: {this.state.movie.Released}<br></br>
                        Rated: {this.state.movie.Rated}<br></br>
                        IMDB/Metacritic: {this.state.movie.imdbRating}/{this.state.movie.Metascore}<br></br>
                        Director: {this.state.movie.Director}<br></br>
                        Country(Language): {this.state.movie.Country}{this.state.movie.Language}<br></br>
                        Awards: {this.state.movie.Awards}<br></br>
                        Runtime: {this.state.movie.Runtime}<br></br>
                        Genre: {this.state.movie.Genre}<br></br>
                        Plot: {this.state.movie.Plot}
                    </p>
                </div>
            )
        }

        else{
            return ( 
                <div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <p>Not Loaded Yet</p>
                </div>
            )
        }
    }
}

export default Movie;