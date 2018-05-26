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
import blueGrey from '@material-ui/core/colors/blueGrey';
import { withStyles  } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DraftsIcon from '@material-ui/icons/Drafts';
import { MuiThemeProvider, createMuiTheme  } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#880E4F',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});


const stringTitle = 'Logotools'
const stringDatesTitle = 'Datumok'
const stringDatesAgeCalcTitle = 'Hany eves?'
const stringDatesBirthCalcTitle = 'Mikor szuletett?'

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
    return (
      <div className={classes.center}>
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

class BirthCalculator extends React.Component {
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
    const { classes } = this.props;
    return (
      <div className={classes.center}>
        <div className={classes.birthContainer}>
          <div className={classes.birthRow}>
            <Button className={classes.birthButton} onClick={this.yearInc.bind(this)}><AddIcon /></Button>
            <Button className={classes.birthButton} variant="raised" color="primary">{this.state.year} eves</Button>
            <Button className={classes.birthButton} onClick={this.yearDec.bind(this)}><RemoveIcon /></Button>
          </div>
          <div className={classes.birthRow}>
            <Button className={classes.birthButton} onClick={this.monthInc.bind(this)}><AddIcon /></Button>
            <Button className={classes.birthButton} variant="raised" color="primary">{this.state.month} honapos</Button>
            <Button className={classes.birthButton} onClick={this.monthDec.bind(this)}><RemoveIcon /></Button>
          </div>
        </div>
        <Button color="disabled" size="large" className={classes.birthResult} onClick={this.reset.bind(this)}>{this.state.date}</Button>
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
          <Tab label={stringDatesAgeCalcTitle} />
          <Tab label={stringDatesBirthCalcTitle} />
        </Tabs>
        {index === 0 && <AgeCalculator classes={classes} />}
        {index === 1 && <BirthCalculator classes={classes} />}
      </div>
    );
  }
}


const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#eeeeee',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'stretch',
    height: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  container: {
    marginTop: 40,
    [theme.breakpoints.down('xs')]: {
      marginTop: 0,
    },
    width: 500,
    height: '100%',
    display: 'block',

  },
  content: {
    height: 400,
    width: '100%',
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
  },
  list: {
    width: 250,
  },
  center: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%'
  },
  birthContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    height: '100%',
    marginTop: 40,
  },
  birthRow: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%',
  },
  birthButton: {
    width: 150,
  },
  birthResult: {
    width: 300,
    marginTop: 20,
  },
})

class App extends Component {
  state = {
    tabTarget: 'dates',
    drawer: false
  }

  toggleDrawer = (open) => () => {
    this.setState({
      drawer: open,
    });
  };

  handleChange = (event, tabTarget) => {
    this.setState({ tabTarget })
  }

  render() {
    const { classes } = this.props;
    const { tabTarget, drawer } = this.state;

    return (
      <div>
        <React.Fragment>
          <CssBaseline />
          <MuiThemeProvider theme={theme}>
            <div className={classes.root}>

              <Drawer open={drawer} onClose={this.toggleDrawer(false)}>
                <div
                  tabIndex={0}
                  role="button"
                  onClick={this.toggleDrawer(false)}
                  onKeyDown={this.toggleDrawer(false)}
                >

                  <div className={classes.list}>
                    <List component="nav">
                      <ListItem button>
                        <ListItemIcon>
                          <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Inbox" />
                      </ListItem>
                      <ListItem button>
                        <ListItemIcon>
                          <DraftsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Drafts" />
                      </ListItem>
                    </List>
                    <Divider />
                    <List component="nav">
                      <ListItem button>
                        <ListItemText primary="Trash" />
                      </ListItem>
                      <ListItem button component="a" href="#simple-list">
                        <ListItemText primary="Spam" />
                      </ListItem>
                    </List>
                  </div>

                </div>
              </Drawer>

              <Grid container justify="center" alignItems="stretch" className={classes.container}>
                <Grid item>
                  <Paper>

                    <AppBar position="static" color='primary'>
                      <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.toggleDrawer(true)}>
                          <MenuIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                          {stringTitle}
                        </Typography>
                      </Toolbar>
                    </AppBar>

                    <div className={classes.content}>
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
          </MuiThemeProvider>
        </React.Fragment>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(App);
