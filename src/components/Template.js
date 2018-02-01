import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Template extends Component {

	handleClick = (id) => {
	  this.props.handleClick(id);
	}

	render() {
		const error = this.props.error;
		const template = this.props.template;
		let i = 1;

		return (
			<div className="template">
				{template.map((point, index) => (
					<div key={index}
						 className={`template__item${point ? '--x' : '--o'}`}
						 onClick={ () => this.handleClick(index) } >
						 	{ point ? i++ : null}
					</div>
				))}
				<div className="template__error">
					{error}
				</div>
			</div>
		);
	}
}

Template.propTypes = {
	error: PropTypes.string,
	template: PropTypes.array.isRequired,
	handleClick: PropTypes.func.isRequired
};

export default Template;