import React from 'react';


export default class Notif extends React.Component {

  constructor(props, context) {
    super(props, context);
  }


  componentDidMount() {
    setTimeout(() => {
      this.refs.root.classList.add('is-active')
    }, 100)
  }


  render() {
    const type = this.props.type || 'info';
    const text = this.props.text;

    return text ? <div className={"ntf is-" + type} ref="root">
      {text}
    </div> : null;
  }
}
