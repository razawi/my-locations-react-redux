import React, { Component } from 'react';
import Footer from '../components/Footer'
import Header from '../components/Header'
import Categories from '../containers/Categories'
import Locations from '../components/Locations'


import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class App extends Component {
  render() {
    return (
    <div>
      <Router>
        <div>
        <Header/>
        <hr/>
          <Route path="/Categories" component={Categories}/>
          <Route path="/Locations" component={Locations}/>
        <hr/>
        <Footer/>
        </div>

      </Router>
    </div>
    )
  }
}

export default App
