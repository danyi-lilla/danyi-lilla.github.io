import React, { Component } from 'react';
import './App.css';
import { hu as locale } from './locale.js';
import getRenderedSize from 'react-rendered-size';

import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';


import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import ContentCopyIcon from '@material-ui/icons/ContentCopy';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import DeleteIcon from '@material-ui/icons/Delete';


class SearchControls extends Component {

  state = {
    first: '',
    inner: '',
    last: '',
    method: 'irrelevant',
    len: 6,
  }

  style = {
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    inputs: {
      wrapper: {
        display: 'flex',
        justifyContent: 'center',
      },
      textField: {
        marginLeft: 10,
        marginRight: 10,
        width: 90,
      },
    },
    len: {
      wrapper: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 10,
      },
      method: {
        width: 145,
        marginRight: 10,
      },
      stepper: {
        pusher: {
          width: 40,
          minWidth: 40,
        },
        display: {
          width: 75,
          minWidth: 60,
        }
      }
    },
    search: {
      width: 310,
      margin: '0 auto',
    },
  }
  
  handleChange = name => event => {
    let value = null
    if (name == 'first' || name == 'last') {
      value = event.target.value.toLowerCase()
    }

    if (name == 'inner') {
      value = event.target.value.toLowerCase()
    }

    this.setState({
      [name]: value,
    });
  };

  handleLengthMethodChange = () => {
    const { method } = this.state
    let newMethod = ''
    switch (method) {
      case "irrelevant":
        newMethod = 'min'
        break
      case "min":
        newMethod = 'max'
        break
      case "max":
        newMethod = 'exactly'
        break
      case "exactly":
        newMethod = 'irrelevant'
        break
      default:
        break
    }
    this.setState({
      method: newMethod
    })
  }

  increaseLength = () => {
    const len = this.state.len
    this.setState({
      len: this.state.len + 1
    })
  }

  decreaseLength = () => {
    const len = this.state.len
    if (len > 1) {
      this.setState({
        len: len - 1
      })
    }
  }

  resetLength = () => {
    this.setState({
      len: 6
    })
  }

  search = () => {
    const { first, inner, last, method, len } = this.state
    const spec = {
      first,
      inner,
      last,
      method,
      len
    }
    this.props.search(spec)
  }

	render() {
    const { first, last, inner, len, method } = this.state;
    const lenMethodLocale = locale.words.search.method(method)

    return (
      <div style={this.style.wrapper}>
        <div style={this.style.inputs.wrapper}>
          <TextField
            id="first"
            label="Kezdobetu"
            style={this.style.inputs.textField}
            value={first}
            onChange={this.handleChange('first')}
            margin="normal"
          />
          <TextField
            id="inner"
            label="Belso betuk"
            style={this.style.inputs.textField}
            value={inner}
            onChange={this.handleChange('inner')}
            margin="normal"
          />
          <TextField
            id="last"
            label="Utolso betu"
            style={this.style.inputs.textField}
            value={last}
            onChange={this.handleChange('last')}
            margin="normal"
          />
        </div>
        <div style={this.style.len.wrapper}>
          <Button style={this.style.len.method} variant="raised" color="primary" onClick={this.handleLengthMethodChange}>{lenMethodLocale}</Button>
          <Button style={this.style.len.stepper.pusher} onClick={this.decreaseLength} variant="raised" color="primary"><RemoveIcon /></Button>
          <Button style={this.style.len.stepper.display} onClick={this.resetLength} variant="raised">{len}</Button>
          <Button style={this.style.len.stepper.pusher} onClick={this.increaseLength} variant="raised" color="primary"><AddIcon /></Button>
        </div>
        <Button style={this.style.search} onClick={this.search} variant="raised" color="primary">Kereses</Button>
      </div>
    );
  }
}

class Paginator extends Component {

  state = {
    current: 0,
  }

  style = {
    wrapper: {
      display: 'flex',
      justifyContent: 'space-around',
      flexDirection: 'column',
      marginTop: 10,
    },
    nav: {
      wrapper: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 20,
      },
      pusher: {
        width: (310-120)/2,
      },
      display: {
        width: 120,
      },
    },
    items: {
      wrapper: {
        padding: '0 10px',
      },
      item: {
        margin: '0 3px 5px 0',
      },
    },

  }

  prev = () => {
    const { current } = this.state

    if (current > 0) {
      this.setState({
        current: current - 1
      })
    }
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.items !== prevProps.items) {
      console.log('items updated')
      this.setState({
        current: 0
      })
    }
  }

  next = () => {
    const { current } = this.state
    const { items, displayCount } = this.props

    if (current < Math.ceil(items.length/displayCount) - 1) {
      this.setState({
        current: current + 1
      })
    }

    const { icon } = this.props;

    const pagerCurrent = current + 1
    const pagerAll = Math.ceil(items.length/displayCount)
    const currentItems = items.slice(current * displayCount, (current + 1) * displayCount)

    const size = getRenderedSize(
        <div style={{width: 480}}>

          <div style={this.style.nav.wrapper}>
            <Button style={this.style.nav.pusher} variant="raised" color="primary" onClick={this.prev}><KeyboardArrowLeftIcon /></Button>
            <Button style={this.style.nav.display} variant="raised">{pagerCurrent} / {pagerAll}</Button>
            <Button style={this.style.nav.pusher} variant="raised" color="primary" onClick={this.next}><KeyboardArrowRightIcon /></Button>
          </div>

          <div style={this.style.items.wrapper}>
            {currentItems.map(item => (
              <Chip
                style={this.style.items.item}
                label={item}
                key={item}
                onDelete={this.selectItem(item)}
                onClick={this.selectItem(item)}
                deleteIcon={icon}
              />
            ))}
          </div>

        </div>
    );

    console.log(size)
  }

  selectItem = item => event => {
    this.props.select(item)
  };

	render() {
    const { current } = this.state;
    const { items, icon, displayCount } = this.props;

    const pagerCurrent = current + 1
    const pagerAll = Math.ceil(items.length/displayCount)
    const currentItems = items.slice(current * displayCount, (current + 1) * displayCount)

    return (
        <div style={this.style.wrapper}>

          <div style={this.style.nav.wrapper}>
            <Button style={this.style.nav.pusher} variant="raised" color="primary" onClick={this.prev}><KeyboardArrowLeftIcon /></Button>
            <Button style={this.style.nav.display} variant="raised">{pagerCurrent} / {pagerAll}</Button>
            <Button style={this.style.nav.pusher} variant="raised" color="primary" onClick={this.next}><KeyboardArrowRightIcon /></Button>
          </div>

          <div style={this.style.items.wrapper}>
            {currentItems.map(item => (
              <Chip
                style={this.style.items.item}
                label={item}
                key={item}
                onDelete={this.selectItem(item)}
                onClick={this.selectItem(item)}
                deleteIcon={icon}
              />
            ))}
          </div>

        </div>
    );
  }
}

class Search extends Component {
  search = (spec) => {
    this.props.search(spec)
  }

	render() {
    const { select, items } = this.props;

    return (
      <div>
        <div>
          <SearchControls search={this.search} />
        </div>
        <Paginator
          displayCount={10}
          items={items}
          select={select}
          icon={<AddCircleIcon />}
        />
      </div>
    );
  }
}

class Collection extends Component {
	render() {
    const { remove, items } = this.props;

    return (
      <div>
        <Paginator
          displayCount={20}
          items={items}
          select={remove}
          icon={<RemoveCircleIcon />}
        />
      </div>
    );
  }
}

class Words extends Component {
  state = {
    index: 0,
    words: [],
    collection: []
  }

  componentDidMount() {
    this.setState({
      collection: this.props.searchEngine.getCollection()
    })
  }

  handleChange = (event, index) => {
    this.setState({ index })
  }

  search = (spec) => {
    this.props.searchEngine.search(spec)
    this.setState({
      words: this.props.searchEngine.getResult()
    })
  }

  select = (word) => {
    this.setState({
      collection: this.props.searchEngine.select(word),
      words: this.props.searchEngine.getResult()
    })
  }

  remove = (word) => {
    this.setState({
      collection: this.props.searchEngine.remove(word),
      words: this.props.searchEngine.getResult()
    })
  }

	render() {
    const { index, words, collection } = this.state;
    const { searchEngine } = this.props;

    return (
      <React.Fragment>
        <Tabs value={index} onChange={this.handleChange} fullWidth>
          <Tab label={locale.words.search.title} />
          <Tab label={locale.words.collection.title + ` (${collection.length})`} />
        </Tabs>
        {index === 0 && <Search
                          items={words}
                          search={this.search}
                          select={this.select} 
                        />}
        {index === 1 && <Collection
                          items={collection}
                          remove={this.remove} 
                        />}
      </React.Fragment>
    );
  }
}


export default Words
