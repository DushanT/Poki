import React, { Component } from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

import logo from './assets/logo.svg';

import List from './components/List';
import Selection from './components/Selection';
import GithubCorner from './components/GithubCorner';
import Template from './components/Template';

import templates from './templates';

axios.defaults.baseURL = 'https://pokeapi.co/api/v2/';

class App extends Component {

  constructor(props) {
    super(props);

    this.defaultState = { 
      items: [],
      selected: null, 
      max: 9,
      loaded: 0,
      error: {
        template: ''
      },
      template: templates[9],
    };

    this.loaded = 0;

    /** default state */
    this.state = this.defaultState;
  }

  /** reload data */
  reload = () => {
    this.setState(this.defaultState, () => {
      this.loaded = 0;
      this.setStorage();
      this.loadState();
    });
  }

  /** init data */
  componentDidMount() {
    this.loadState();
  }

  /** main storage */
  getStorage() {
    return localStorage.poki;
  }

  /** set storage */
  setStorage() {
    localStorage.setItem('poki', JSON.stringify(this.state));
  }

  /** helper load state */
  loadState() {
    let state = this.state;
    const storage = this.getStorage();

    if(storage) {
      state = JSON.parse(storage);
      this.saveState(state);
    }

    this.loadItems(state.items);

  }

  /** setState helper */
  saveState(state) {
    this.setState(state, () => this.setStorage());
  }

  /** get core data from localStorage or request from API */
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

  /** get item by id or name */
  getItem(items, selector) {
    let _ = this;

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

          items[data.id - 1] = itemData;

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

  /** handling selection of item */
  handleSelect = (item) => {
    let selected = null;

    if(item !== null)
      selected = this.state.items[item.id - 1];

    this.saveState({ 
      selected: selected 
    });
  }

  /** handling template clicks */
  handleClickTemplate = (id) => {
    let template = this.state.template;
    const max = this.state.max;
    const clickedValue = template[id];
    const sum = template.reduce((accumulator, current) => (
      accumulator + current
    ));

    if(sum >= max && clickedValue === 0) {
      let timeout;
      this.setState({
        error: {
          template: 'Max ' + max
        }
      }, () => {
        let _ = this;
        
        if(timeout)
          clearTimeout(timeout);

        timeout = setTimeout(() => {
          _.setState({
            error: {
              template: _.defaultState.error.template
            }
          });
        },1500);
      });
    } else {

      template[id] = clickedValue === 1 ? 0 : 1;
      
      this.saveState({
        template: template
      });
    }

  }

  render() {
    const selected = this.state.selected;
    const items = this.state.items;
    const template = this.state.template;
    const percent = (this.state.loaded / this.state.max) * 100;
    const loading = percent < 100 ;
    const error = this.state.error;

    return (
      <div className="app">

        <GithubCorner/>

        <div className="app__reset"
          onClick={ this.reload }>
            Reload
        </div>

        <Template 
          error={error.template}
          template={template}
          handleClick={ id => this.handleClickTemplate(id) } />

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
          <React.Fragment>
            <Selection 
              selected={selected} 
              handleSelect={ item => this.handleSelect(item) } />

            <List 
              items={items}
              template={template} 
              handleSelect={ item => this.handleSelect(item) } />
          </React.Fragment>
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
    loaded: PropTypes.number,
    error: PropTypes.shape({
      template: PropTypes.string,
    }).isRequired,
    template: PropTypes.array.isRequired,
  })
};

export default App;