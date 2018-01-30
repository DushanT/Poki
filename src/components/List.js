import React, { Component } from 'react';
import ListItem from './ListItem';

class List extends Component {

  handleClick(item) {
    return ( e => {
      this.props.handleSelect(item);
    });
  }

  renderItem(item) {
    if(!item) return null;

    return (
      <ListItem 
        key={item.id} 
        item={item} 
        onClick={ this.handleClick(item) } />
    );
  }

  render() {
    const pokis = this.props.pokis;
    if(!pokis) return null;

    return (
      <ul className="main__list">
        {pokis.map( item => this.renderItem(item) )}
      </ul>
    );
  }
}
export default List;