import React from 'react';
import './App.css';
import BookList from './BookList.js';
import BookDetails from './BookDetails.js';
import BookCreate from './BookCreate.js';
import Home from './Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect
} from "react-router-dom";

function App() {
  // @Switch: Spezifischere Routen müssen weiter oben stehen. Also längere Routen mit mehr "/" Angaben
  return (
    <Router>
      <div className="ui menu">
        <NavLink to="/home" className="item" activeClassName="active">Home</NavLink>
        <NavLink to="/books" className="item" activeClassName="active">Bücher</NavLink>
        <NavLink to="/create" className="item" activeClassName="active">Buch anlegen</NavLink>
      </div>

      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/books/:isbn">
          <BookDetails />
        </Route>
        <Route path="/books">
          <BookList />
        </Route>
        <Route path="/create">
          <BookCreate />
        </Route>
        <Route path="/">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </Router>
  )


}

export default App;
