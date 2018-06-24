import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import axios from 'axios';


class SearchEngine {
  wordsURL = 'https://raw.githubusercontent.com/tiborsimon/words-hun/master/words/words.json.min?nocache=' + new Date().getTime()
  words_key = 'words'
  collection_key = 'collection'

  constructor() {
    this.words = this.loadWords()
    this.collection = this.loadCollection()
    this.result = []
  }

  loadWords = () => {
    if (this.words_key in localStorage) {
      let words = JSON.parse(localStorage.getItem(this.words_key))
      console.log('Words found in local storage')
      return words
    }
    axios.get(this.wordsURL)
      .then(res => {
        console.log('Words downloaded')
        localStorage.setItem(this.words_key, JSON.stringify(res.data))
        this.words = res.data
        return res.data
      })
  }

  loadCollection = () => {
    if (this.collection_key in localStorage) {
      let collection = JSON.parse(localStorage.getItem(this.collection_key))
      console.log('Collection found in local storage')
      return collection
    }
    return []
  }

  saveCollection = () => {
    localStorage.setItem(this.collection_key, JSON.stringify(this.collection))
  }

  getCollection = () => {
    return this.collection.map((word) => ({
      word, 
      selected: true
    }))
  }

  select = (word) => {
    console.log('select called')
    if (this.collection.indexOf(word) === -1) {
      this.collection.push(word)
      this.collection.sort()
      this.saveCollection()
      console.log(`"${word}" was added`)
    }
  }

  remove = (word) => {
    const index = this.collection.indexOf(word)
    if (index > -1) {
      this.collection.splice(index, 1);
      this.saveCollection()
      console.log(`"${word}" was removed`)
    }
  }

  filterMethod = (word, method, len) => {
    switch (method) {
      case "irrelevant":
        return true
      case "min":
        return word.length >= len
      case "max":
        return word.length <= len
      case "exactly":
        return word.length === len
      default:
        break
    }
  }

  permut = (xs) => {
    let ret = [];
    for (let i = 0; i < xs.length; i = i + 1) {
      let rest = this.permut(xs.slice(0, i).concat(xs.slice(i + 1)));
      if (!rest.length) {
        ret.push([xs[i]])
      } else {
        for (let j = 0; j < rest.length; j = j + 1) {
          ret.push([xs[i]].concat(rest[j]))
        }
      }
    }
    return ret
  }

  generateRegex = (spec) => {
    const { first, inner, last } = spec
    let patternString = ''

    if (inner.length > 0) {

      // assemble first
      if (first.length > 0) {
        patternString = `^${first}.*(`
      } else {
        patternString = `^.+(`
      }

      // assemble inner
			let r = /(["'])(?:\\\1|.)*?\1/g
      let m;
      let letters = inner
      let quotes = []
      do {
        m = r.exec(inner)
        if (m) {
          quotes.push(m)
        }
      } while (m)


      let Q = []
      if (quotes) {
        for (let q of quotes) {
          Q.push(q[0].slice(1,-1))
          letters = letters.replace(q[0],'')
        }
      }

      letters = new Set(letters)
      letters = Array.from(letters).concat(Q)

      for (let p of this.permut(letters)) {
        patternString += '('
        for (let c of p) {
          patternString += `${c}.*`
        }
        patternString += ')|'
      }
      patternString = patternString.slice(0, -1)

      console.log(patternString)
      
      // assemble last
      if (last.length > 0) {
        patternString += `).*${last}$`
      } else {
        patternString += `).+$`
      }

    } else {
      patternString = `^${first}.*${last}$`
    }

    return new RegExp(patternString)
  }

  search = (spec) => {
    const { method, len } = spec
    const r = this.generateRegex(spec)
    let result = []
    for (let word of this.words) {
      if (r.test(word.toLowerCase())) {
        if (!this.filterMethod(word, method, len)) continue
        result.push(word)
      }
    }
    this.result = result
  }

  getResult = () => {
    return this.result.map((word) => ({
      word, 
      selected: this.collection.includes(word)
    }))
  }
}

let searchEngine = new SearchEngine()

ReactDOM.render(
  <App searchEngine={searchEngine} />
  , document.getElementById('root'));
registerServiceWorker();

