import React, { Component } from 'react';
import './App.css';
import Movie from './Movie.js';

class RenderMovieList extends Component {
    //renders all the movies given by either the initial creation or search/filter
    //props required are the response from tmdb
    render() {
      let movies = this.props.data || undefined;
      //maps all movies to cards
      if(movies != undefined){
        movies=movies.results;
        let movieCards = movies.map((movie)=> {
          return <MovieCard key={movie.id} movie={movie} />
        })
        return(
          <div className='container'>
            <div className='row'> 
              {movieCards}
            </div>
          </div>
        );
      }
      return(<p>no current results</p>);
    }
  }
  export default RenderMovieList;
  class MovieCard extends Component {
    //creates a card for the movie, that flips to reveal more detailed information
    //requires a movie object prop in tmdb format
    constructor(props){
      super(props);
      this.handleChildClick = this.handleChildClick.bind(this);
      this.state = {selected:false};
    }
  
    handleClick = (e) => {
      e.preventDefault();
      this.setState({selected:true})
    }
  
    handleChildClick(e) {
      this.setState({selected:false});
    }
    render(){
      let movie = this.props.movie;
      if(this.state.selected){
        return(
          <div className='card col-md-4'>
            <Movie movieId={movie.id} handleChildClick={this.handleChildClick} aria-label="click card to see details"/>
          </div>
        );
      }
      return(
        <div className='card col-md-4' onClick={this.handleClick} aria-label='click on this card for more detailed information'>
          <img className='card-img-top' alt='Poster of movie' src = {'http://image.tmdb.org/t/p/w185/{path}'.replace('{path}',movie.poster_path)}/>
          <div className='card-block'>  
            <h4 className='card-title'>
            {movie.title}
            </h4>
            <p className='card-text'>
              {movie.overview}
            </p>
          </div>
        </div>
      );
    }
  }