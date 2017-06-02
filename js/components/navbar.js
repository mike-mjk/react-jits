import React from 'react';
import { searchYoutube } from '../actions';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.onFormSubmit = this.onFormSubmit.bind(this);

    this.state = {
      term: ''
    }
  }

  //Event handler calls searchYout
  onFormSubmit(e) {
    e.preventDefault();
    console.log('onFormSubmit is called with this term:', this.state.term)
    if (this.state.term != '') {
      this.props.searchYoutube(this.state.term, this.props.history);
    }
  }

  render() {
    console.log('Search render');
    return (
      <form onSubmit={this.onFormSubmit} id="search-youtube-form" className="navbar-form">
        
        <div className="form-group">
          <input value={this.state.term}
          onChange={event => this.setState({term: event.target.value})}
          id="search-youtube-input" type="search" className="form-control"
          placeholder="Search YouTube" />
        </div>
        
        <div className="form-group">
          <button type="submit" className="btn btn-default">Search</button>
        </div>

      </form>
    )
  }

}

const SearchWithRouter = withRouter(Search);

class NavBar extends React.Component {

  render() {
    console.log('navbar render');
    return (
      <nav className='navbar navbar-default'>
        <div className='container'>
          
          <div className="navbar-header">
            <a href="/index.html" className="navbar-brand">Jiu-Jitsu Tube</a>
          </div>

          <SearchWithRouter searchYoutube={this.props.searchYoutube} />
          
        </div>
      </nav>
    )   
  }
  
}

// Search = connect(null, { searchYoutube })(Search);

export default connect(null, { searchYoutube })(NavBar); 
// export default NavBar;