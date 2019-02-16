
import React, { Component } from 'react'; //import React Component

// export class MovieNav extends Component {
//     render() {
//         return (
//           <nav className="navbar navbar-toggleable-lg navbar-inverse bg-inverse">
//             <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//                 <span class="navbar-toggler-icon"></span>
//             </button>
//             <a className="navbar-brand" href="#">Home</a>
//             <div className="collapse navbar-collapse" id="navbarSupportedContent">
//               <ul className="navbar-nav mr-auto">
//                 <li className="nav-item active">
//                   <a className="nav-link" href="">About Us</a>
//                 </li>
//                 <li>
//                 <a className="nav-link" href="">Contact Us</a>
//                 </li> 
//               </ul>
//             </div>
//           </nav>  
//         );
//       }
// }

export class NavBar extends Component {
    //links to other html pages, not implemented yet, will be implemented
    // when we do component-routing
    render() {
      return (
        <div className="nav">
          <div className="nav-header">
            <div className="nav-title">Movie Browser</div>
          </div>
  
          {/* <div className="nav-btn">
            <label className="nav-check" for="click to show contents of navabar">
              <span></span>
              <span></span>
              <span></span>
            </label>
          </div>
  
          <input type="checkbox" id="nav-check" />
  
          <div className="nav-links"> 
            <a href="#" aria-label='click to get to home page'>Home</a>
            <a href="#" aria-label='click to know about us'>About Us</a>
            <a href="#" araa-label='click to contact us'>Contact Us</a>
          </div> */}
  
        </div>
      );
    }
  }
  
  export class Header extends Component {
    // header jumbotron
    render() {
      return(
        <header>
           <div className="jumbotron">
              <h1 id = "header">Movies</h1>
           </div>
        </header>
      );
    }
  }