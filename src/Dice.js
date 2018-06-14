import React, { Component } from 'react';
import './App.css';
import './Datetime.css';


import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';


class Dice extends Component {
  state = {
    initialized: false,
    lastUpdated: null,
    loading: false,
    success: false,
    words: [],
  }

  componentDidMount() {
  }

	render() {
    const { classes } = this.props;

    console.log(this.state)

    return (
      <h1>Dice</h1>
    );
  }
}

export default Dice
