import React, { Component } from 'react';
import { Route, Switch, Link, NavLink } from 'react-router-dom';
import './App.css';
import './Datetime.css';
import Datetime from 'react-datetime';
import moment from 'moment';


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
          <NavLink to='/datumok' className={'nav-link'} activeClassName='active'>Datumok</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to='/szokereso' className={'nav-link'} activeClassName='active'>Szokereso</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to='/dobokocka' className={'nav-link'} activeClassName='active'>Dobokocka</NavLink>
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

class Datumok extends React.Component {
  constructor({ match, location, history }) {
    super()
    this.state = {
      y: 0,
      m: 0,
      d: 0,
      year: 0,
      month: 0,
      date: moment().format('YYYY MMM DD')
    }
  }

  reload() {
    this.refs.datetime.setState({currentView: 'years', selectedDate: undefined})
    this.setState({
      y: 0,
      m: 0,
      d: 0
    })
  }

  isValidDate(d) {
    return d.isBefore(moment())
  }

  dateChanged(selected) {
    let a = moment()
    let b = moment(selected)
    let y = a.diff(b, 'years')
    b.add(y, 'years')
    let m = a.diff(b, 'months')
    b.add(m, 'months')
    let d = a.diff(b, 'days')
    this.setState({
      y,
      m,
      d
    })
  }

  yearInc() {
    this.setState({
      year: this.state.year + 1
    }, this.calculateDate)
  }

  yearDec() {
    const current = this.state.year - 1
    if (current >= 0) {
      this.setState({
        year: current
      }, this.calculateDate)
    }
  }

  monthInc() {
    this.setState({
      month: this.state.month + 1
    }, this.calculateDate)
  }

  monthDec() {
    const current = this.state.month - 1
    if (current >= 0) {
      this.setState({
        month: current
      }, this.calculateDate)
    }
  }

  calculateDate() {
    const now = moment()
    now.subtract(this.state.year, 'years')
    now.subtract(this.state.month, 'months')
    this.setState({
      date: now.format('YYYY MMM DD')
    })
  }

  render() {
    return (
      <div>
        <Jumbotron title='Datumok' />

        <div className="container">
          <div className="card-deck">

            <div className="card text-center">
              <div className="card-header">
                <h5 className="mb-0">Hany eves jelenleg?</h5>
              </div>
              <div className="card-body d-flex justify-content-center">
                <Datetime viewMode={'years'} timeFormat={false} input={false} onChange={this.dateChanged.bind(this)} ref="datetime" />
              </div>
              <div className="card-footer">
                  <button className="btn btn-block btn-light" onClick={this.reload.bind(this)}>
                    <h5 className="mb-0"><span className="badge badge-secondary">{this.state.y}</span> ev <span className="badge badge-secondary ml-2">{this.state.m}</span> honap <span className="badge badge-secondary ml-2">{this.state.d}</span> nap</h5>
                  </button>
              </div>
            </div>

            <div className="card text-center">
              <div className="card-header">
                <h5 className="mb-0">Mikor szuletett?</h5>
              </div>
              <div className="card-body d-flex align-items-center justify-content-center">
                <div className="btn-group-vertical btn-group-lg mr-2" role="group">
                  <button type="button" className="btn btn-light" onClick={this.yearInc.bind(this)}><i className="fas fa-chevron-up"></i></button>
                  <button type="button" className="btn btn-secondary">{this.state.year} ev</button>
                  <button type="button" className="btn btn-light" onClick={this.yearDec.bind(this)}><i className="fas fa-chevron-down"></i></button>
                </div>
                <div className="btn-group-vertical btn-group-lg" role="group">
                  <button type="button" className="btn btn-light" onClick={this.monthInc.bind(this)}><i className="fas fa-chevron-up"></i></button>
                  <button type="button" className="btn btn-secondary">{this.state.month} honap</button>
                  <button type="button" className="btn btn-light" onClick={this.monthDec.bind(this)}><i className="fas fa-chevron-down"></i></button>
                </div>
              </div>
              <div className="card-footer">
                <button className="btn btn-block btn-light">
                  <h5 className="mb-0">{this.state.date}</h5>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    );
  }
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
