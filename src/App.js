import React, { Component } from 'react';
import './App.css';
import './Datetime.css';

import { hu as locale } from './locale.js';

import Dates from './Dates.js'
import Words from './Words.js'
import Dice from './Dice.js'

import AppBar from '@material-ui/core/AppBar';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import CasinoIcon from '@material-ui/icons/Casino';
import EventIcon from '@material-ui/icons/Event';
import FontDownloadIcon from '@material-ui/icons/FontDownload';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
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
      width: 276,
      height: '100%',
      background: '#eeeeee',
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



class App extends Component {
  state = {
    tabTarget: 'dates',
  }

  handleChange = (event, tabTarget) => {
    this.setState({ tabTarget })
  }

  render() {
    const { classes, searchEngine } = this.props;
    const { tabTarget } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <Paper className={classes.container}>

          <Header classes={classes} />

          <div className={classes.content}>
            {tabTarget === 'dates' && <Dates classes={classes} />}
            {tabTarget === 'words' && <Words classes={classes} searchEngine={searchEngine} />}
            {tabTarget === 'dice' && <Dice />}
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
  style = {
    help: {
      borderTop: "1px solid #ddd",
      background: 'white',
      boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)'
    },
    footer: {
      wrapper: {
        margin: 18,
        textAlign: 'center',
      },
      entry: {
        opacity: 0.5,
      }
    }

  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.list}>

        <List style={this.style.help} component="nav">
          <ListItem button>
            <ListItemText primary={locale.help.title} />
          </ListItem>
        </List>

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>{locale.dates.help.title}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography dangerouslySetInnerHTML={locale.dates.help.content}></Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>{locale.words.help.title}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography dangerouslySetInnerHTML={locale.words.help.content}></Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>{locale.dice.help.title}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography dangerouslySetInnerHTML={locale.dice.help.content}></Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <div style={this.style.footer.wrapper}>
          <Typography style={this.style.footer.entry}>Simon Tibor &copy; 2018</Typography>
          <Typography style={this.style.footer.entry}>{locale.help.footer.version}</Typography>
          <hr style={this.style.footer.entry} />
          <Typography style={this.style.footer.entry}>{locale.help.footer.legal}</Typography>
          <br />
          <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/2.5/hu/"><img alt="Creative Commons Licenc" style={{borderWidth: 0}} src="https://i.creativecommons.org/l/by-nc-sa/2.5/hu/88x31.png" /></a>
        </div>

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
          <SideMenu classes={classes} />
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
