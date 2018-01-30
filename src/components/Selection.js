import React, { Component } from 'react';

const img_path = 'https://img.pokemondb.net/sprites/black-white/anim/';

class Selection extends Component {

  handleClick(item) {
    return ( e => {
      this.props.handleSelect(item);
    });
  }

  render() {
    const selected = this.props.selected;
    if(!selected) return null;

    return (
      <div>
        <div className="main__overlay" 
             onClick={ this.handleClick(null) }></div>
        
        <div className="main__selection">
          
          <div className="selection__close" 
               onClick={ this.handleClick(null) }>x</div>

          <div className="selection__image-wrapper">
            <img class="selection__image" src={img_path + 'normal/' + selected.name + '.gif'} alt=""/>
            <img class="selection__image" src={img_path + 'back-normal/' + selected.name + '.gif'} alt=""/>
          </div>

          <div className="selection__details">
            <div className="details__name" >{selected.name}</div>
            <div>Base experience: {selected.base_experience}</div>
            <div>Default: {selected.is_default.toString()}</div>
            <div>Height: {selected.height}</div>
            <div>Weight: {selected.weight}</div>
            <div>Abilities: { selected.abilities.map( abil => { return <span key={abil.ability.name}>{ abil.ability.name } </span> }) }</div>
          </div>

        </div>
      </div>
    );
  }

}
export default Selection;