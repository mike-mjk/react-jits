import React from 'react';
// import { getSearchResults } from '../app';
import { searchYoutube } from '../actions';
import { connect } from 'react-redux';
// import { browserHistory } from 'react-router';

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.onFormSubmit = this.onFormSubmit.bind(this);

  }

  onFormSubmit(e) {
    e.preventDefault();
    var term = document.getElementById('search-youtube-input').value;
    //
    this.props.searchYoutube(term);
    this.props.history.push('/search');
  }

  render() {
  	return (
  		<nav className='navbar navbar-default'>
      	<div className='container'>
          <div className="navbar-header">
            <a href="/index.html" className="navbar-brand">Jiu-Jitsu Tube</a>
          </div>

          <form onSubmit={this.onFormSubmit} id="search-youtube-form" className="navbar-form">
  		      <div className="form-group">
  		        <input id="search-youtube-input" type="search" className="form-control" placeholder="Search YouTube" />
  		      </div>
            <div className="form-group">
              <button type="submit" className="btn btn-default">Search</button>
            </div>
          </form>
  			</div>
  		</nav>
  	)   
  }
  
}

export default connect(null, { searchYoutube })(NavBar); 