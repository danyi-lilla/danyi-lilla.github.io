import React, { Component } from 'react';
import { Route, Switch, Link, NavLink } from 'react-router-dom';
import './App.css';


const Home = () => (
  <div>
    <h2> Home </h2>
  </div>
);

const Nav = () => (
  <nav className="navbar navbar-expand-sm navbar-light bg-light">
    <div className="container">
      <Link className="navbar-brand" to="/">Danyi Lilla</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <NavLink to='/szokereso' className={'nav-link'} activeClassName='active'>Szokereso</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to='/dobokocka' className={'nav-link'} activeClassName='active'>Dobokocka</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to='/datumok' className={'nav-link'} activeClassName='active'>Datumok</NavLink>
        </li>
      </ul>
      <div className="text-muted d-none d-md-block">
        Logopediai segedeszkozok
      </div>

    </div>
    </div>
  </nav>
);

const Jumbotron = (props) => (
  <div className="jumbotron jumbotron-fluid">
    <div className="container">
      <h3>{props.title}</h3>
    </div>
  </div>
);

const Szokereso = () => {
  return (
    <Jumbotron title='Szokereso' />
  );
}

const Dobokocka = () => {
  return (
    <Jumbotron title='Dobokocka' />
  );
}

const Datumok = () => {
  return (
    <Jumbotron title='Datumok' />
  );
}

class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/szokereso" component={Szokereso}/>
          <Route path="/dobokocka" component={Dobokocka}/>
          <Route path="/datumok" component={Datumok}/>
        </Switch>
      </div>
    );
  }
}

export default App;
