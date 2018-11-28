import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';


import 'whatwg-fetch';
import {NavBar, Header} from './MovieNav.js';
import RenderMovieList from './RenderMovies.js';
import Search from './Search.js';
import Filter from './Filter.js';


class App extends Component {
  constructor(props) {
    super(props);
    this.updateResults = this.updateResults.bind(this);
    this.state = {
      movies:undefined //tmdb response of movies
    };
  }

  componentDidMount() {
    const apiKey = "5998a49a96a6ec70146d23cc8f3193eb";
    const baseURL = "https://api.themoviedb.org/3/discover/movie?api_key=";
    fetch(baseURL + apiKey)
    .then((response) => response.json())
    .then((response) => this.setState({movies:response}))
    .catch(err => err.message);
  
  }
  updateResults(resp) {
    this.setState({movies:resp});
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <Header /> 
        <Search  updateResults={this.updateResults}/>
        <div id='display'>
          <RenderMovieList data={this.state.movies}/> 
          <Filter updateResults={this.updateResults}/>
        </div>
        
      </div>
    );
  }
}

export default App;
