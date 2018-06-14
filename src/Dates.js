import React, { Component } from 'react';

import './App.css';
import './Datetime.css';
import { hu as locale } from './locale.js';

import Datetime from 'react-datetime';
import moment from 'moment';
import 'moment/locale/hu'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import IconButton from '@material-ui/core/IconButton';

import AddIcon from '@material-ui/icons/Add';
import CachedIcon from '@material-ui/icons/Cached';
import RemoveIcon from '@material-ui/icons/Remove';


class AgeCalculator extends Component {
  state = {
    year: 0,
    month: 0,
    day: 0,
    result: false
  }

  reset() {
    this.refs.datetime.setState({currentView: 'years', selectedDate: undefined})
    this.setState({
      year: 0,
      month: 0,
      day: 0,
      result: false
    })
  }

  isValidDate(d) {
    return d.isBefore(moment())
  }

  dateChanged(selected) {
    let a = moment()
    let b = moment(selected)
    let year = a.diff(b, 'years')
    b.add(year, 'years')
    let month = a.diff(b, 'months')
    b.add(month, 'months')
    let day = a.diff(b, 'days')
    this.setState({
      year,
      month,
      day,
      result: true
    })
  }

  render() {
    const { classes } = this.props;
    const { year, month, day, result } = this.state
    return (
      <div className={classes.center}>
        <Datetime viewMode={'years'} timeFormat={false} input={false} onChange={this.dateChanged.bind(this)} ref="datetime" />
        <div className={classes.row}>
          <Chip
            avatar={<Avatar className={classes.avatar}>{year.toString()}</Avatar>}
            label={locale.dates.age.year}
            onClick={this.reset.bind(this)}
            className={classes.chip}
          />
          <Chip
            avatar={<Avatar className={classes.avatar}>{month.toString()}</Avatar>}
            label={locale.dates.age.month}
            onClick={this.reset.bind(this)}
            className={classes.chip}
          />
          <Chip
            avatar={<Avatar className={classes.avatar}>{day.toString()}</Avatar>}
            label={locale.dates.age.day}
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
    date: moment().format(locale.dates.format)
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
      date: now.format(locale.dates.format)
    })
  }

  reset() {
    this.setState({
      year: 0,
      month: 0,
      date: moment().format(locale.dates.format)
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
            <Button className={classes.birthButton} variant="raised" color="primary" onClick={this.yearInc.bind(this)}><AddIcon /></Button>
            <Button className={classes.birthButton} variant="raised" color="default">{year} {locale.dates.birth.year}</Button>
            <Button className={classes.birthButton} variant="raised" color="primary" onClick={this.yearDec.bind(this)}><RemoveIcon /></Button>
          </div>
          <div className={classes.birthRow}>
            <Button className={classes.birthButton} variant="raised" color="primary" onClick={this.monthInc.bind(this)}><AddIcon /></Button>
            <Button className={classes.birthButton} variant="raised" color="default">{month} {locale.dates.birth.month}</Button>
            <Button className={classes.birthButton} variant="raised" color="primary" onClick={this.monthDec.bind(this)}><RemoveIcon /></Button>
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
      <React.Fragment>
        <Tabs value={index} onChange={this.handleChange} fullWidth>
          <Tab label={locale.dates.age.title} />
          <Tab label={locale.dates.birth.title} />
        </Tabs>
        {index === 0 && <AgeCalculator classes={classes} />}
        {index === 1 && <BirthCalculator classes={classes} />}
      </React.Fragment>
    );
  }
}

export default Dates
