import React, { Component } from 'react';
import './App.css';
import './Datetime.css';
import { hu as locale } from './locale.js';


import Button from '@material-ui/core/Button';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';


class Steppers extends React.Component {
  state = {
    lower: 1,
    upper: 6,
  }

  upperInc = () => {
    this.setState({
      upper: this.state.upper + 1
      }, ()=>{this.props.setUpper(this.state.upper)})
  }

  upperDec = () => {
    const current = this.state.upper - 1
    if (current >= 0) {
      this.setState({
        upper: current
      }, ()=>{this.props.setUpper(this.state.upper)})
    }
  }

  lowerInc = () => {
    this.setState({
      lower: this.state.lower + 1
    }, ()=>{this.props.setLower(this.state.lower)})
  }

  lowerDec = () => {
    const current = this.state.lower - 1
    if (current >= 0) {
      this.setState({
        lower: current
      }, ()=>{this.props.setLower(this.state.lower)})
    }
  }

  style = {
    wrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      width: 310,
    },
    row: {
      wrapper: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'column',
      },
      button: {
        width: 150,
      }
    }
  }

  render() {
    const { upper, lower } = this.state

    return (
      <div style={this.style.wrapper}>
        <div style={this.style.row.wrapper}>
          <Button style={this.style.row.button}>{locale.dice.multi.lower}</Button>
          <Button style={this.style.row.button} variant="raised" color="primary" onClick={this.lowerInc}><AddIcon /></Button>
          <Button style={this.style.row.button} variant="raised" color="default">{lower}</Button>
          <Button style={this.style.row.button} variant="raised" color="primary" onClick={this.lowerDec}><RemoveIcon /></Button>
        </div>
        <div style={this.style.row.wrapper}>
          <Button style={this.style.row.button}>{locale.dice.multi.upper}</Button>
          <Button style={this.style.row.button} variant="raised" color="primary" onClick={this.upperInc}><AddIcon /></Button>
          <Button style={this.style.row.button} variant="raised" color="default">{upper}</Button>
          <Button style={this.style.row.button} variant="raised" color="primary" onClick={this.upperDec}><RemoveIcon /></Button>
        </div>
      </div>
    )
  }

}

class RegularDice extends Component {
  state = {
    value: 0,
    rotate: false,
  }

  roll = () => {
    this.setState({
      rotate: true,
      value: 0
    })
  }

  generateNumber = () => {
    let value = Math.floor(Math.random() * 6) + 1
    this.setState({
      value
    })
  }

  componentDidMount() {
    const dice = this.dice;
    dice.addEventListener("animationend", this.rotatingDone);
  }
  componentWillUnmount() {
    const dice = this.dice;
    dice.removeEventListener("animationend", this.rotatingDone);
  }

  rotatingDone = () => {
    this.setState({
      rotate: false
    })
    this.generateNumber()
  }

  generateColors = (value) => {
    let colors = []

    switch (value) {
      case 1:
        colors = [
          0,0,0,
          0,1,0,
          0,0,0
        ]
        break;
      case 2:
        colors = [
          1,0,0,
          0,0,0,
          0,0,1
        ]
        break;
      case 3:
        colors = [
          1,0,0,
          0,1,0,
          0,0,1
        ]
        break;
      case 4:
        colors = [
          1,0,1,
          0,0,0,
          1,0,1
        ]
        break;
      case 5:
        colors = [
          1,0,1,
          0,1,0,
          1,0,1
        ]
        break;
      case 6:
        colors = [
          1,0,1,
          1,0,1,
          1,0,1
        ]
        break;
      default:
        break;
    }
    return colors
  }

  style = {
    wrapper: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      flexDirection: 'column',
      height: '100%',
    },
    dices: {
      wrapper: {
        position: 'relative',
        top: -1,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      },
      row: {
        wrapper: {
          display: 'flex',
        },
        dot: {
          margin: 5,
          borderRadius: '50%',
          background: '#dedede',
          width: 50,
          height: 50,
          display: 'block',
          transition: 'all 0.2s',
        },
        colordot: {
          margin: 5,
          borderRadius: '50%',
          background: '#c2185b',
          width: 50,
          height: 50,
          display: 'block',
          transition: 'all 0.2s',
          boxShadow: '0 0 20px -2px rgba(194,24,91,0.8)'
        },
      },
    },
  }

	render() {
    const { value, rotate } = this.state
    let colors = this.generateColors(value)
    let cc = colors.map((c)=>(c===1?true:false))

    return (
      <div style={this.style.wrapper} onClick={this.roll}>
        <div 
          style={this.style.dices.wrapper}
          className={rotate ? "rotate" : ""}
          ref={elm => {
            this.dice = elm;
          }}
        >
          <div style={this.style.dices.row.wrapper}>
            <div style={cc[0] ? this.style.dices.row.colordot : this.style.dices.row.dot}></div>
            <div style={cc[1] ? this.style.dices.row.colordot : this.style.dices.row.dot}></div>
            <div style={cc[2] ? this.style.dices.row.colordot : this.style.dices.row.dot}></div>
          </div>
          <div style={this.style.dices.row.wrapper}>
            <div style={cc[3] ? this.style.dices.row.colordot : this.style.dices.row.dot}></div>
            <div style={cc[4] ? this.style.dices.row.colordot : this.style.dices.row.dot}></div>
            <div style={cc[5] ? this.style.dices.row.colordot : this.style.dices.row.dot}></div>
          </div>
          <div style={this.style.dices.row.wrapper}>
            <div style={cc[6] ? this.style.dices.row.colordot : this.style.dices.row.dot}></div>
            <div style={cc[7] ? this.style.dices.row.colordot : this.style.dices.row.dot}></div>
            <div style={cc[8] ? this.style.dices.row.colordot : this.style.dices.row.dot}></div>
          </div>
        </div>
      </div>
    );
  }
}

class MultiDice extends Component {
  state = {
    lower: 1,
    upper: 6,
    value: 0
  }

  roll = () => {
    const { lower, upper } = this.state
    let value = Math.floor(Math.random() * (upper - lower + 1)) + lower
    this.setState({
      value
    })
  }

  setLower = (lower) => {
    this.setState({
      lower
    })
  }

  setUpper = (upper) => {
    this.setState({
      upper
    })
  }

  style = {
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      height: '100%'
    },
    roll: {
      width: 310,
      marginTop: 10,
    },
    result: {
      marginTop: 18,
    }
  }

	render() {

    const { value } = this.state

    return (
      <div style={this.style.wrapper}>
        <Steppers 
          setLower={this.setLower}
          setUpper={this.setUpper}
        />
        <Button style={this.style.roll} variant="raised" color="primary" onClick={this.roll}>{locale.dice.multi.roll}</Button>
        <Button style={this.style.result} variant="fab" color="default" onClick={this.roll}>{value}</Button>
      </div>
    );
  }
}

class Dice extends Component {
  state = {
    index: 0,
    words: [],
    collection: []
  }

  handleChange = (event, index) => {
    this.setState({ index })
  }

	render() {
    const { index } = this.state;

    return (
      <React.Fragment>
        <Tabs value={index} onChange={this.handleChange} fullWidth>
          <Tab label={locale.dice.regular.title} />
          <Tab label={locale.dice.multi.title} />
        </Tabs>
        {index === 0 && <RegularDice />}
        {index === 1 && <MultiDice />}
      </React.Fragment>
    );
  }
}

export default Dice
