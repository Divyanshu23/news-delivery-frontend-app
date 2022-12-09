import React, { Component } from 'react'
import Navbar from './components.js/Navbar';
import News from './components.js/News';

import {
  Routes,
  Route
} from 'react-router-dom'

export class App extends Component {
  static propTypes = {}
  pageSize = 12
  country = "in"
  apikey = process.env.REACT_APP_API_KEY
  categories = ["general", "business", "entertainment", "health", "science", "sports", "technology"]

  render() {
    return (
      <>
        <Navbar title="NewsItIs" categories={this.categories} />
        <Routes>
          <Route exact path='/' element={<News key="general" apikey={this.apikey} category="general" pageSize={this.pageSize} country={this.country} />}>
          </Route>
          {
            this.categories.map((element) => {
              return <Route key={element} exact path={`/${element}`} element={<News key={element} apikey={this.apikey} category={element} pageSize={this.pageSize} country={this.country} />}>
              </Route>
            })
          }
        </Routes>
      </>
    )
  }
}

export default App