import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ListItem from './ListItem';

class List extends Component {

  handleClick(item) {
    return ( () => {
      this.props.handleSelect(item);
    });
  }

  renderItem(item, index) {
    return (
        <ListItem
          key={index}
          item={item}
          onClick={ this.handleClick(item) } />
    );
  }

  renderEmpty(item, index) {
    return (
        <ListItem 
          key={index}
          item={item} 
          onClick={ this.handleClick(item) } />
    );
  }

  render() {
    const items = this.props.items;
    const template = this.props.template;
    let i = 0;

    if(!items)
      return null;

    return (
      <div className="list">
        {template.map( (pos, index) => {

          let item;
          if(pos === 1)
            item = items[i++];

          return pos === 1
            ? this.renderItem(item, index)
            : this.renderEmpty(pos, index);
        })}
      </div>
    );
}
  }

List.propTypes = {
  items: PropTypes.array,
  template: PropTypes.array.isRequired,
  handleSelect: PropTypes.func.isRequired
};

export default List;