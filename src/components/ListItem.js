import React, { Component } from 'react';

class ListItem extends Component {

  handleClick(item) {
    return ( e => {
      this.props.onClick(item);
    });
  }

  render() {
    const item = this.props.item;
    return (
      <li className="list__item"
        onClick={ this.handleClick(item) } >
        
        <img 
          src={item.sprites.front_default} 
          className="item__image"
          alt="img_front"/>

        <img 
          src={item.sprites.back_default} 
          className="item__image--back"
          alt="img_back"/>
      </li>
    );
  }
}
export default ListItem;