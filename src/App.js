import React, { Component } from 'react';
import './App.css';
import './Datetime.css';
import Datetime from 'react-datetime';
import moment from 'moment';
import axios from 'axios';

import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';

import AddIcon from '@material-ui/icons/Add';
import CachedIcon from '@material-ui/icons/Cached';
import CasinoIcon from '@material-ui/icons/Casino';
import DraftsIcon from '@material-ui/icons/Drafts';
import EventIcon from '@material-ui/icons/Event';
import FontDownloadIcon from '@material-ui/icons/FontDownload';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/Inbox';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuIcon from '@material-ui/icons/Menu';
import RemoveIcon from '@material-ui/icons/Remove';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

const wordsURL = 'https://raw.githubusercontent.com/tiborsimon/words-hun/master/words/words.json.min'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#fa5788',
      main: '#c2185b',
      dark: '#8c0032',
      contrastText: '#fff',
    },
    secondary: {
      light: '#fa5788',
      main: '#c2185b',
      dark: '#8c0032',
      contrastText: '#fff',
    },
    // secondary: {
    //   light: '#5ddef4',
    //   main: '#00acc1',
    //   dark: '#007c91',
    //   contrastText: '#000',
    // },
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

  reset() {
    this.refs.datetime.setState({currentView: 'years', selectedDate: undefined})
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
        <Datetime viewMode={'years'} timeFormat={false} input={false} onChange={this.dateChanged.bind(this)} ref="datetime" />
        <div className={classes.row}>
          <Chip
            avatar={<Avatar className={classes.avatar}>{y.toString()}</Avatar>}
            label="ev"
            onClick={this.reset.bind(this)}
            className={classes.chip}
          />
          <Chip
            avatar={<Avatar className={classes.avatar}>{m.toString()}</Avatar>}
            label="honap"
            onClick={this.reset.bind(this)}
            className={classes.chip}
          />
          <Chip
            avatar={<Avatar className={classes.avatar}>{d.toString()}</Avatar>}
            label="nap"
            onClick={this.reset.bind(this)}
            className={classes.chip}
          />
        </div>
      {result && <IconButton color='primary' onClick={this.reset.bind(this)}><CachedIcon /></IconButton>}
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
    const { year, month } = this.state
    const result = year > 0 || month > 0
    return (
      <div className={classes.center}>
        <div className={classes.birthContainer}>
          <div className={classes.birthRow}>
            <Button className={classes.birthButton} variant="raised" onClick={this.yearInc.bind(this)}><AddIcon /></Button>
            <Button className={classes.birthButton} variant="raised" color="primary">{year} eves</Button>
            <Button className={classes.birthButton} variant="raised" onClick={this.yearDec.bind(this)}><RemoveIcon /></Button>
          </div>
          <div className={classes.birthRow}>
            <Button className={classes.birthButton} variant="raised" onClick={this.monthInc.bind(this)}><AddIcon /></Button>
            <Button className={classes.birthButton} variant="raised" color="primary">{month} honapos</Button>
            <Button className={classes.birthButton} variant="raised" onClick={this.monthDec.bind(this)}><RemoveIcon /></Button>
          </div>
        </div>
        <Button variant="raised" size="large" className={classes.birthResult} onClick={this.reset.bind(this)}>{this.state.date}</Button>
      {result && <IconButton color='primary' onClick={this.reset.bind(this)}><CachedIcon /></IconButton>}
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


const styles = () => {
  const contentHeight = window.innerHeight - 56*2
  return {
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
      height: 440,
      [theme.breakpoints.down('xs')]: {
        height: contentHeight,
      },
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
      backgroundColor: theme.palette.primary.main,
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
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      height: '100%',
      marginTop: 60,
      width: 310,
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
      width: 310,
      marginTop: 10,
    },
    ageRefreshButton: {
      width: 50,
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 90,
    },
  }
}

class WordSearch extends Component {
  state = {
    first: '',
    last: '',
    inner: '',
    len: '',
    words: [],
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  select = word => {
    console.log(word)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.words !== this.state.words) {
      this.setState({ words: nextProps.words });
    }
  }

	render() {
    const { first, last, inner, len, words } = this.state;
    const { classes } = this.props;
    console.log('imre')
    console.log(words)
    console.log(words)

    return (
      <div>
        <TextField
          id="first"
          label="Kezdobetu"
          className={classes.textField}
          value={first}
          onChange={this.handleChange('first')}
          margin="normal"
        />
        <TextField
          id="last"
          label="Utolso betu"
          className={classes.textField}
          value={last}
          onChange={this.handleChange('last')}
          margin="normal"
        />
        <TextField
          id="inner"
          label="Belso betuk"
          className={classes.textField}
          value={inner}
          onChange={this.handleChange('inner')}
          margin="normal"
        />
        <TextField
          id="len"
          label="Hossz"
          className={classes.textField}
          value={len}
          onChange={this.handleChange('len')}
          margin="normal"
        />

        {words.forEach((word) => 
          <Chip
            label={word}
            onDelete={this.select(word)}
          />
        )}
      </div>
    );
  }
}

class Words extends Component {
  state = {
    initialized: false,
    lastUpdated: null,
    loading: false,
    success: false,
    words: [],
  }

  componentDidMount() {
    if (localStorage.words) {
      console.log('key found')
      this.words = JSON.parse(localStorage.getItem('words'))
    } else {
      this.words = []
      console.log('key not found')
    }
    this.loadWords()
    console.log(this.words)
  }

  loadWords() {
    this.setState({
      loading: true,
      success: false
    })
    this.request = axios.get(wordsURL)
      .then(res => {
        localStorage.setItem('words', JSON.stringify(res.data))
        const updated = moment().format('YYYY MMM DD')
        localStorage.setItem('wordsUpdated', updated)
        this.setState({
          initialized: true,
          lastUpdated: updated,
          loading: false,
          success: false,
          words: ['imre', 'bela', 'pista'],
        }, ()=>{console.log('UPDATED!!!')})
      })
  }

	render() {
    const { loading, words } = this.state;
    const { classes } = this.props;

    console.log(this.state)

    return (
        <div className={classes.center}>
          {!loading && <WordSearch classes={classes} words={words} />}
          {loading && <CircularProgress />}
        {words.map((word, index) => 
          <Chip
            label={word}
          />
        )}
        </div>
    );
  }
}

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
                      {tabTarget === 'words' && <Words classes={classes} />}
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

export default withTheme(theme)(withStyles(styles)(App))
