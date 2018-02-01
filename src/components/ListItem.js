import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ListItem extends Component {

  handleClick(item) {
    return ( () => {
      this.props.onClick(item);
    });
  }

  render() {
    const item = this.props.item;

    if(!item)
      return <div className="list__item"></div>; 

    return (
      <div className="list__item--full"
        onClick={ this.handleClick(item) } >
        
        <img 
          src={item.sprites.front_default} 
          className="item__image"
          alt="img_front"/>

        <img 
          src={item.sprites.back_default} 
          className="item__image--back"
          alt="img_back"/>

        <div className="item__name">
          {item.name}
        </div>
      </div>
    );
  }
}

ListItem.propTypes = {
  item: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number
  ]),
  onClick: PropTypes.func.isRequired,
};

export default ListItem;