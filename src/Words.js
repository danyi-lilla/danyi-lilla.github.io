import React, { Component } from 'react';
import './App.css';
import { hu as locale } from './locale.js';
import FileSaver from 'file-saver';

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
    if (name === 'first' || name === 'last') {
      value = event.target.value.toLowerCase()
    }

    if (name === 'inner') {
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
            label={locale.words.search.inputs.start}
            style={this.style.inputs.textField}
            value={first}
            onChange={this.handleChange('first')}
            margin="normal"
          />
          <TextField
            id="inner"
            label={locale.words.search.inputs.inner}
            style={this.style.inputs.textField}
            value={inner}
            onChange={this.handleChange('inner')}
            margin="normal"
          />
          <TextField
            id="last"
            label={locale.words.search.inputs.end}
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
      selected: {
        margin: '0 3px 5px 0',
        backgroundColor: '#c2185b',
        color: 'white',
      },
    },

  }

  componentDidMount() {
    this.props.registerReset(this.reset)
  }

  reset = () => {
      this.setState({
        current: 0
      })
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
  }

  selectItem = item => event => {
    if (item.selected) {
      this.props.remove(item.word)
    } else {
      this.props.select(item.word)
    }
  };

	render() {
    const { current } = this.state;
    const { items, displayCount, colorizeCollection } = this.props;

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
                style={item.selected && colorizeCollection ? this.style.items.selected : this.style.items.item}
                label={item.word}
                key={item.word}
                onDelete={this.selectItem(item)}
                onClick={this.selectItem(item)}
                deleteIcon={item.selected ? <RemoveCircleIcon /> : <AddCircleIcon />}
              />
            ))}
          </div>

        </div>
    );
  }
}


class Search extends Component {
  reset = () => {}

  search = (spec) => {
    this.props.search(spec)
    this.reset()
  }

  registerReset = (callback) => {
    this.reset = callback
  }

	render() {
    const { select, remove, items } = this.props;

    return (
      <div>
        <div>
          <SearchControls search={this.search} />
        </div>
        <Paginator
          displayCount={10}
          items={items}
          select={select}
          remove={remove}
          registerReset={this.registerReset}
          icon={<AddCircleIcon />}
          colorizeCollection={true}
        />
      </div>
    );
  }
}

class Collection extends Component {
  style = {
    wrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 'auto',
      marginRight: 'auto',
      width: 310,
    },
    button: {
      width: 310,
    },
  }

  save = () => {
    let words = this.props.items.map((item)=>item.word)

    let file = new File([words.join("\n")], "szolista.txt", {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(file);
  }
  
	render() {
    const { select, remove, items } = this.props;

    return (
      <div>
        <div style={this.style.wrapper}>
          <Button style={this.style.button} variant="raised" color="primary" onClick={this.save}>{locale.words.collection.save}</Button>
        </div>
        <Paginator
          displayCount={20}
          items={items}
          select={select}
          remove={remove}
          icon={<RemoveCircleIcon />}
          registerReset={()=>{}}
          colorizeCollection={false}
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
    this.props.searchEngine.select(word)
    this.setState({
      collection: this.props.searchEngine.getCollection(),
      words: this.props.searchEngine.getResult()
    })
  }

  remove = (word) => {
    this.props.searchEngine.remove(word)
    this.setState({
      collection: this.props.searchEngine.getCollection(),
      words: this.props.searchEngine.getResult()
    })
  }

	render() {
    const { index, words, collection } = this.state;

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
                          remove={this.remove} 
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
