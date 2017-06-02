// the babel polyfill line was in there from whatever boilerplate starter this used. not sure if I need it.
require('babel-polyfill');

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';
import thunk from 'redux-thunk';

import reducers from './reducers';
import NavBar from './components/navbar';
import Video from './components/video';
import VideoWatch from './components/watch'
import SideBar from './components/sidebar'
import Search from './components/search';

const createStoreWithMiddleware = applyMiddleware(promise, thunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Route path="/" component={NavBar} />
        <Switch>
        	<Route path="/watch/:id" component={VideoWatch} />
        	<Route path="/search" component={Search} />
          <Route path="/" component={Video} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('#root'));
