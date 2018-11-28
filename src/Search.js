import React, { Component } from 'react';
import './App.css';

class Search extends Component {
    // Passes back up the resulting movie list from a search of tmdb.
    // Doesn't integrate with filter
    // props required: callback function to get results
    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.state={search:''};
    }
    
    handleChange(evt){
      this.setState({search:evt.target.value});
    }
  
    handleSubmit(evt) {
      evt.preventDefault();
      const apiKey = "5998a49a96a6ec70146d23cc8f3193eb";
      const searchURL = "https://api.themoviedb.org/3/search/movie?api_key=";
      fetch(searchURL + apiKey +  "&language=en-US&query=" + this.state.search)
        .then((res) => res.json())
        .then((data) => this.props.updateResults(data)) //parent callback function
        .catch((err) => alert(err.message));
    }
  
  
    // input form
    render() {
      return(
        <section className="pb-4">
           <div className="container">
              <form id="search-form" onSubmit = {this.handleSubmit} aria-label='search bar for movie names and press enter to search'>
                 <input value={this.state.search} onChange={this.handleChange} type="text" className="form-control" placeholder="Search for any movie! (Type full name)" />
              </form>
           </div>
        </section>
      );
    }
  }
  export default Search;