import React, { Component } from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

import logo from './assets/logo.svg';
import './App.css';

import './style/Scrollbars.css';
import './style/Transitions.css';

import List from './components/List';
import Selection from './components/Selection';

axios.defaults.baseURL = 'https://pokeapi.co/api/v2/';

class App extends Component {

  constructor(props) {
    super(props);

    // default state
    this.state = { 
      items: [],
      selected: null, 
      max: 9,
    };
  }

  // init data
  componentDidMount() {
    // localStorage.clear();
    this.loadState();
  }

  // main storage
  getStorage() {
    return localStorage.poki;
  }

  // set storage
  setStorage(state) {
    if(!state)
      return;

    localStorage.setItem('poki', JSON.stringify(state));
  }

  // helper save state 
  saveState(state) {
    if(!state) 
      return;

    this.setState(state);
    this.setStorage(this.state);
  }

  // helper load state 
  loadState() {
    let state = this.state;
    const storage = this.getStorage();

    if(storage) {
      state = JSON.parse(storage);
      this.setState(state);
    }

    this.loadItems(state.items);

  }

  // handling selection of item
  handleSelect = (item) => {
    let selected = null;

    if(item)
      selected = this.state.items[item.id - 1];

    this.saveState({ selected: selected });
  }

  // get core data from localStorage 
  // or request from API
  loadItems(oldItems) {
    if (!oldItems.length || (this.state.max !== oldItems.length)) {
      for (let id = 0; id < this.state.max; id++) {
        this.getItem(oldItems, id+1);
      }
    }
  }

  // get item by id or name
  getItem(items, selector) {
    let _ = this;

    axios.get('pokemon/' + selector)
      .then(function (response) {
        let data = response.data;
        if(data) {
          // console.log(data);
          let itemData = {
            id: data.id,
            name: data.name,
            sprites: data.sprites,
            base_experience: data.base_experience,
            height: data.height,
            weight: data.weight,
            abilities: data.abilities,
          };

          items[response.data.id - 1] = itemData;
          _.saveState({ items: items });

        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const selected = this.state.selected;
    const items = this.state.items;
    const loading = this.state.loading;

    return (
      <div className="app">

        <img src={logo} 
          className="app__background" 
          alt="logo"/>
        
        <div className="app__main">

          <div>
            {loading}
          </div>

          <Selection 
            selected={selected} 
            handleSelect={ item => this.handleSelect(item) } />

          <List 
            items={items} 
            handleSelect={ item => this.handleSelect(item) } />

        </div>

      </div>
    );
  }

}

App.propTypes = {
  state: PropTypes.shape({
    items: PropTypes.array.isRequired,
    selected: PropTypes.object,
    max: PropTypes.number,
  })
};

export default App;
