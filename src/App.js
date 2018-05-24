import React, { Component } from 'react';
import { Route, Switch, Link, NavLink } from 'react-router-dom';
import './App.css';
import './Datetime.css';
import Datetime from 'react-datetime';
import moment from 'moment';

import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Button from '@material-ui/core/Button';
import CasinoIcon from '@material-ui/icons/Casino';
import Chip from '@material-ui/core/Chip';
import CssBaseline from '@material-ui/core/CssBaseline';
import EventIcon from '@material-ui/icons/Event';
import FontDownloadIcon from '@material-ui/icons/FontDownload';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import pink from '@material-ui/core/colors/pink';
import { withStyles  } from '@material-ui/core/styles';


const stringDatesTitle = 'Datumok'
const stringWordsTitle = 'Szokereso'
const stringDiceTitle = 'Dobokocka'








class AgeCalculator extends Component {
  state = {
    y: 0,
    m: 0,
    d: 0,
    result: false
  }

  resetPicker() {
    this.refs.datetime.setState({currentView: 'years', selectedDate: undefined})
    this.resetState()
  }

  resetState() {
    this.setState({
      y: 0,
      m: 0,
      d: 0,
      result: false
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
      d,
      result: true
    })
  }

  render() {
    const { classes } = this.props;
    const { y, m, d, result } = this.state
    console.log(this.props)
    return (
      <div className=''>
        <Datetime viewMode={'years'} timeFormat={false} input={false} onChange={this.dateChanged.bind(this)} onViewModeChange={this.resetState.bind(this)} ref="datetime" />
        {result &&
        <div className={classes.row}>
          <Chip
            avatar={<Avatar className={classes.avatar}>{y.toString()}</Avatar>}
            label="ev"
            onClick={this.resetPicker.bind(this)}
            className={classes.chip}
          />
          <Chip
            avatar={<Avatar className={classes.avatar}>{m.toString()}</Avatar>}
            label="honap"
            onClick={this.resetPicker.bind(this)}
            className={classes.chip}
          />
          <Chip
            avatar={<Avatar className={classes.avatar}>{d.toString()}</Avatar>}
            label="nap"
            onClick={this.resetPicker.bind(this)}
            className={classes.chip}
          />
        </div>}
      </div>
    )
  }

}

class BirthDateCalculator extends React.Component {
  state = {
    year: 0,
    month: 0,
    date: moment().format('YYYY MMM DD')
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

  reset() {
    this.setState({
      year: 0,
      month: 0,
      date: moment().format('YYYY MMM DD')
    })
  }

  render() {
    return (
      <div className="card text-center">
        <div className="card-header">
          <h5 className="mb-0">Mikor szuletett, hogy ha most..</h5>
        </div>
        <div className="card-body d-flex align-items-center justify-content-center">
          <div className="btn-group-vertical btn-group-lg mr-2" role="group">
            <button type="button" className="btn btn-primary" onClick={this.yearInc.bind(this)}><i className="fas fa-chevron-up"></i></button>
            <button type="button" className="btn btn-secandary">{this.state.year} eves</button>
            <button type="button" className="btn btn-primary" onClick={this.yearDec.bind(this)}><i className="fas fa-chevron-down"></i></button>
          </div>
          <div className="btn-group-vertical btn-group-lg" role="group">
            <button type="button" className="btn btn-primary" onClick={this.monthInc.bind(this)}><i className="fas fa-chevron-up"></i></button>
            <button type="button" className="btn btn-secandary">{this.state.month} honapos</button>
            <button type="button" className="btn btn-primary" onClick={this.monthDec.bind(this)}><i className="fas fa-chevron-down"></i></button>
          </div>
        </div>
        <div className="card-footer">
          <button className="btn btn-block btn-light" onClick={this.reset.bind(this)}>
            <h5 className="mb-0">{this.state.date}</h5>
          </button>
        </div>
      </div>
    )
  }

}





class Dates extends Component {
  state = {
    index: 0,
  }

  handleChange = (event, index) => {
    this.setState({ index })
  }

  render() {
    const { classes } = this.props;
    const { index } = this.state;

    return (
      <div>
        <Tabs value={index} onChange={this.handleChange} fullWidth>
          <Tab label="Hany eves?" />
          <Tab label="Mikor szuletett?" />
        </Tabs>
        {index === 0 && <AgeCalculator classes={classes} />}
        {index === 1 && <div className={classes.content}>Item Two</div>}
      </div>
    );
  }
}


const styles = theme => {
  console.log(theme)
  return {
  root: {
    flexGrow: 1,
    backgroundColor: '#eeeeee',
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    marginTop: '20px',
    width: 500,
    display: 'block',
  },
  content: {
    height: 400,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flexDirection: 'column',
  },
  button: {
    margin: theme.spacing.unit,
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
  avatar: {
    color: '#fff',
    backgroundColor: pink[500],
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
  }
}};

class App extends Component {
  state = {
    tabTarget: 'dates',
  }

  handleChange = (event, tabTarget) => {
    this.setState({ tabTarget })
    console.log(this.state)
  }

  render() {
    const { classes } = this.props;
    const { tabTarget } = this.state;

    return (
      <div>
        <React.Fragment>
          <CssBaseline />
          <div className={classes.root}>
            <Grid container spacing={24} justify="center" alignItems="stretch" className={classes.container}>
              <Grid item>
                <Paper>

                  <div class={classes.content}>
                    {tabTarget === 'dates' && <Dates classes={classes} />}
                    {tabTarget === 'words' && <div>Item Two</div>}
                    {tabTarget === 'dice' && <div>Item Three</div>}
                  </div>

                  <BottomNavigation value={tabTarget} onChange={this.handleChange} className={classes.navigation}>
                    <BottomNavigationAction label={stringDatesTitle} value="dates" icon={<EventIcon />} />
                    <BottomNavigationAction label={stringWordsTitle} value="words" icon={<FontDownloadIcon />} />
                    <BottomNavigationAction label={stringDiceTitle} value="dice" icon={<CasinoIcon />} />
                  </BottomNavigation>

                </Paper>
              </Grid>
            </Grid>
          </div>
        </React.Fragment>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(App);
