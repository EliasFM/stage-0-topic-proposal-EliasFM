import React, { Component } from 'react';
import './App.css';
import { Form, FormGroup, Label, Input,Button} from 'reactstrap';

class Filter extends Component {
    // Does a filter of all results 
    // Doesn't integreate with search
    // Requires a callback prop to pass up results
    constructor(props) {
      super(props);
      this.handleChangeGenre = this.handleChangeGenre.bind(this);
      this.handleChangeAdult = this.handleChangeAdult.bind(this);
      this.handleChangeRadio = this.handleChangeRadio.bind(this);
      this.updateResults = this.updateResults.bind(this);
      this.state = {
        genre: '',
        adult: false,
        sort: 'popularity.desc'
      };
    }
  
    handleChangeGenre(evt) {
        // evt.preventDefault();
        this.setState({genre: evt.target.value});
        // this.updateResults();
      }
  
    handleChangeAdult(evt) {
        // evt.preventDefault();
        if(this.state.adult){
            this.setState({adult: true});
        }else{
            this.setState({adult: false});
        }
        // this.updateResults();
      }
    handleChangeRadio(evt) {
    //   evt.preventDefault();
      this.setState({sort: evt.target.id});
    //   this.updateResults();
    }
  
    updateResults() {
        console.log(this.state);
        
      const apiKey = "5998a49a96a6ec70146d23cc8f3193eb";
      const baseURL = "https://api.themoviedb.org/3/discover/movie?api_key=";
      if(this.state.genre != ''){
        let url = baseURL + apiKey + "&language=en-US&sort_by=" + this.state.sort + "&include_adult=" + this.state.adult + "&with_genres=" + this.state.genre;
        fetch(url)
            .then((response) => response.json())
            .then((data) => this.props.updateResults(data)) //parent callback function
            .catch((err) => alert(err.message));
      }else{
        let url = baseURL + apiKey + "&language=en-US&sort_by=" + this.state.sort + "&include_adult=" + this.state.adult + "&with_genres=" + this.state.genre;
        fetch(url)
          .then((response) => response.json())
          .then((data) => this.props.updateResults(data)) //parent callback function
          .catch((err) => alert(err.message));
      }
    }
    
    componentDidMount(){
        this.updateResults();
    }
    render() {
      return(
        <div id="filter">
          <Form>
            <Label for="exampleSelect"><legend>Genre:</legend></Label>
              <select value={this.state.genre} onChange={this.handleChangeGenre} aria-label='select genre to filter by'>
                <option  value ="">All</option>
                <option  value="28" >Action</option>
                <option  value="12">Adventure</option>
                <option  value="16">Animation</option>
                <option  value="35">Comedy</option>
                <option  value="80">Crime</option>
                <option  value="99">Documentary</option>
                <option  value="18">Drama</option>
                <option  value="10751">Family</option>
                <option  value="14">Fantasy</option>
                <option  value="36">History</option>
                <option  value="27">Horror</option>
                <option  value="10402">Music</option>
                <option  value="9648">Mystery</option>
                <option  value="10749">Romance</option>
                <option  value="53">Thriller</option>
                <option  value="10752">War</option>
                <option  value="37">Western</option>
                </select>
            <br />
            <br />
            <FormGroup check>
              <Label check>
                <Input type="checkbox" onChange={this.handleChangeAdult} aria-label='checkbox to include adult movies'/>
                Include adult movies?
              </Label>
            </FormGroup>
            <br />
            <br />
            <FormGroup tag="fieldset">
              <legend>Sort by:</legend>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="radio" onChange={this.handleChangeRadio} 
                  id="popularity.desc" defaultChecked aria-label='radio button to order movies in descending order by popularity'/>{' '}
                  Most Popular to Least Popular
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="radio" onChange={this.handleChangeRadio} id="vote_count.desc"
                  aria-label='radio button to order movies in descending order by votes'/>{' '}
                  Highest Vote Count to Lowest Vote Count
                </Label>
              </FormGroup>
            </FormGroup>
           
          </Form>
          <Button  onClick={this.updateResults} aria-label='submits filter selections'>
                Submit
            </Button>
        </div>
      );
    }
  }
  export default Filter;