import React from 'react';
// import { getSearchResults } from '../app';
import { searchYoutube } from '../actions';
import { connect } from 'react-redux';
// import { browserRouter as react-router } from 'react-router-dom';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.onFormSubmit = this.onFormSubmit.bind(this);

    this.state = {
      term: ''
    }
  }

  onFormSubmit(e) {
    e.preventDefault();
    console.log(this.props.searchYoutube);
    // this.props.search(this.state.term);
    this.props.searchYoutube;
    console.log('submitted2');
    // console.log(browserHistory);
    // browserHistory.push('/search');

    // this.props.history.push('/search');
  }

  render() {
    console.log('in Search', this.props)
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

class NavBar extends React.Component {

  render() {
    console.log(this.props.searchYoutube);
    return (
      <nav className='navbar navbar-default'>
        <div className='container'>
          
          <div className="navbar-header">
            <a href="/index.html" className="navbar-brand">Jiu-Jitsu Tube</a>
          </div>

          <Search searchYoutube={this.props.searchYoutube} />
          
        </div>
      </nav>
    )   
  }
  
}

// Search = connect(null, { searchYoutube })(Search);

export default connect(null, { searchYoutube })(NavBar); 
// export default NavBar;