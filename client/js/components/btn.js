import React from 'react';


export default class Btn extends React.Component {

  constructor(props, context) {
    super(props, context);
  }


  handleClick(e) {
    if (e && e.preventDefault) e.preventDefault();
    return this.props.onClick ? this.props.onClick() : false;
  }


  render() {
    const {text, disabled, onClick, ...rest} = this.props;

    return text ? <span
      role="button"
      className="btn"
      disabled={disabled}
      onClick={this.handleClick.bind(this)}
    >
      {text}
    </span> : null;
  }
}
