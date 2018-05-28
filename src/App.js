import React, { Component } from 'react';
import './App.css';
import './Datetime.css';
import moment from 'moment';
import axios from 'axios';

import { hu as locale } from './locale.js';

import Dates from './Dates.js'

import AppBar from '@material-ui/core/AppBar';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';

import CasinoIcon from '@material-ui/icons/Casino';
import DraftsIcon from '@material-ui/icons/Drafts';
import EventIcon from '@material-ui/icons/Event';
import FontDownloadIcon from '@material-ui/icons/FontDownload';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/Inbox';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuIcon from '@material-ui/icons/Menu';

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


const styles = () => {
  const contentHeight = window.innerHeight - 56*2
  return {
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
    },
    birthContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: 60,
      width: 310,
    },
    birthRow: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      flexDirection: 'column',
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
  }

  handleChange = (event, tabTarget) => {
    this.setState({ tabTarget })
  }

  render() {
    const { classes } = this.props;
    const { tabTarget } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <Paper className={classes.container}>

          <Header classes={classes} />

          <div className={classes.content}>
            {tabTarget === 'dates' && <Dates classes={classes} />}
            {tabTarget === 'words' && <Words classes={classes} />}
            {tabTarget === 'dice' && <div>Item Three</div>}
          </div>

          <BottomNavigation value={tabTarget} onChange={this.handleChange} className={classes.navigation}>
            <BottomNavigationAction label={locale.dates.title} value="dates" icon={<EventIcon />} />
            <BottomNavigationAction label={locale.words.title} value="words" icon={<FontDownloadIcon />} />
            <BottomNavigationAction label={locale.dice.title} value="dice" icon={<CasinoIcon />} />
          </BottomNavigation>

        </Paper>
      </MuiThemeProvider>
    );
  }
}


class SideMenu extends Component {
  render() {
    const { classes } = this.props;

    return (
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
    )
  }
}

class Header extends Component {
  state = {
    drawer: false
  }

  toggleDrawer = (open) => () => {
    this.setState({
      drawer: open,
    });
  };

  render() {
    const { classes } = this.props;
    const { drawer } = this.state;

    return (
      <React.Fragment>
        <Drawer open={drawer} onClose={this.toggleDrawer(false)}>
          <div tabIndex={0} role="button" onClick={this.toggleDrawer(false)} onKeyDown={this.toggleDrawer(false)}>
            <SideMenu classes={classes} />
          </div>
        </Drawer>

        <AppBar position="static" color='primary'>
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              {locale.app.title}
            </Typography>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(App)
