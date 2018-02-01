import React, { Component } from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

import logo from './assets/logo.svg';

import List from './components/List';
import Selection from './components/Selection';
import GithubCorner from './components/GithubCorner';

axios.defaults.baseURL = 'https://pokeapi.co/api/v2/';

class App extends Component {

  constructor(props) {
    super(props);

    this.loaded = 0;

    // default state
    this.state = { 
      items: [],
      selected: null, 
      max: 9,
      loaded: 0,
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
  setStorage() {
    localStorage.setItem('poki', JSON.stringify(this.state));
  }

  // helper load state 
  loadState() {
    let state = this.state;
    const storage = this.getStorage();

    if(storage) {
      state = JSON.parse(storage);
      this.saveState(state);
    }

    this.loadItems(state.items);

  }

  saveState(state) {
    this.setState(state, () => this.setStorage());
  }

  // get core data from localStorage 
  // or request from API
  loadItems(oldItems) {
    if (!oldItems.length || (this.state.max !== oldItems.length)) {
      for (let id = 0; id < this.state.max; id++) {
        this.getItem(oldItems, id+1);
      }
    } else {
      this.saveState({ 
        loaded: oldItems.length 
      });
    }
  }

  // handling selection of item
  handleSelect = (item) => {
    let selected = null;

    if(item !== null)
      selected = this.state.items[item.id - 1];

    this.saveState({ 
      selected: selected 
    });
  }

  // get item by id or name
  getItem(items, selector) {
    let _ = this;

    /*setTimeout(() => {
      let itemData = {
        id: 1,
        name: 'bulba',
        sprites: [],
        base_experience: 100,
        height: 10,
        weight: 1000,
        abilities: [],
      };

      items[selector-1] = itemData;
      _.saveState({ 
        loaded: ++_.loaded, 
      });
    }, 500 * selector);
    return;*/

    axios.get('pokemon/' + selector)
      .then(function (response) {
        let data = response.data;
        if(data) {
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

          _.saveState({ 
            loaded: ++_.loaded,
            items: items 
          });

        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  reload = () => {
    
    this.setState({ 
      items: [],
      selected: null, 
      max: 9,
      loaded: 0,
    }, () => {
      this.loaded = 0;
      this.setStorage();
      this.loadState();
    });
  }

  render() {
    const selected = this.state.selected;
    const items = this.state.items;
    const percent = (this.state.loaded / this.state.max) * 100;
    const loading = percent !== 100 ;

    return (
      <div className="app">

        <GithubCorner/>

        <img src={logo} 
          className="app__background" 
          alt="logo"/>

        {loading && 
          <div className="loading">
            <div className="loading__percent">
              {Math.ceil(percent)}% 
            </div>
            <div className="loading__fill" style={{width: percent + '%'}}>
            </div>
          </div>
        }
        
        {!loading && 
          <div className="main">

            <Selection 
              selected={selected} 
              handleSelect={ item => this.handleSelect(item) } />

            <List 
              items={items} 
              handleSelect={ item => this.handleSelect(item) } />

          </div>
        }

        {!loading && 
          <div className="app__reset"
            onClick={ this.reload }>
              Reload
          </div>
        }

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