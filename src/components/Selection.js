import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { CSSTransition } from "react-transition-group";

const img_path = "https://img.pokemondb.net/sprites/black-white/anim/";

class Selection extends Component {
  handleClick(item) {
    return (e) => {
      this.props.handleSelect(item);
    };
  }

  render() {
    const selected = this.props.selected;

    return (
      <div>
        {selected && (
          <CSSTransition in={selected} classNames="fade" timeout={200}>
            <div className="overlay" onClick={this.handleClick(null)} />
          </CSSTransition>
        )}

        {selected && (
          <div className="selection">
            <div className="selection__close" onClick={this.handleClick(null)}>
              x
            </div>

            <Scrollbars autoHide>
              <div className="selection__image-wrapper">
                <img
                  className="selection__image"
                  src={img_path + "normal/" + selected.name + ".gif"}
                  alt=""
                />
                <img
                  className="selection__image"
                  src={img_path + "back-normal/" + selected.name + ".gif"}
                  alt=""
                />
              </div>

              <div className="details">
                <div className="details__name">{selected.name}</div>
                <div className="details__more">
                  <div>
                    <span className="details__info-name">
                      Base experience:{" "}
                    </span>
                    <span>{selected.base_experience}</span>
                  </div>
                  <div>
                    <span className="details__info-name">Height: </span>
                    <span>{selected.height}</span>
                  </div>
                  <div>
                    <span className="details__info-name">Weight: </span>
                    <span>{selected.weight}</span>
                  </div>
                  <div>
                    <span className="details__info-name">Abilities: </span>
                    <ul>
                      {selected.abilities.map((item) => (
                        <li key={item.ability.name}>{item.ability.name}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Scrollbars>
          </div>
        )}
      </div>
    );
  }
}
export default Selection;
