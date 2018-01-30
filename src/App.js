import React, { Component } from 'react';

import axios from 'axios';

import logo from './logo.svg';
import './App.css';

import List from './components/List';
import Selection from './components/Selection';

axios.defaults.baseURL = 'http://pokeapi.co/api/v2/';
const pokisMax = 9;


class App extends Component {

  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);

    this.state = { 
      pokis: [], 
      selected: null 
    };
  }

  handleSelect(item) {
    var selected =  item 
                    ? this.state.pokis[item.id - 1] 
                    : null;

    this.setState({ selected: selected });
  }

  loadData() {
    var pokis = [];
    if(localStorage.pokis) {
      pokis = JSON.parse(localStorage.pokis);
      this.setState({ pokis: pokis });
    }

    this.getData(pokis, 1);
  }

  getData(pokis, id) {
    var _ = this;

    if(!pokis)
      pokis = [];
    
    if (pokisMax !== pokis.length) {

      var loaded = 0;

      axios.get('pokemon/' + id++)
        .then(function (response) {
          pokis[response.data.id - 1] = response.data;
          if(++loaded === pokisMax) {
            _.setState({ pokis: pokis });
            localStorage.pokis = JSON.stringify(pokis);
          } else {
            this.getData(pokis, id);
          }
        })
        .catch(function (error) {
          console.log(error);
        });

    }
  }

  render() {
    const selected = this.state.selected;
    const pokis = this.state.pokis;

    return (
      <div className="app">
        
        <img src={logo} 
          className="app__background" 
          alt="logo" />
        
        <div className="app__main">

          <Selection 
            selected={selected} 
            handleSelect={ item => this.handleSelect(item) } />

          <List 
            pokis={pokis} 
            handleSelect={ item => this.handleSelect(item) } />

        </div>
      </div>
    );
  }

  componentWillMount() {
    this.loadData();
  }
}

export default App;
