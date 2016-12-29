import React from 'react';


export default class Notif extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
  }


  componentDidMount() {
    setTimeout(() => {
      this.refs.root.classList.add('is-active')
    }, 100)

    this.refs.root.addEventListener('transitionend', this.handleTransitionEnd);
  }


  componentWillUnmount() {
    this.refs.root.removeEventListener('transitionend', this.handleTransitionEnd);
  }


  handleTransitionEnd() {
    this.refs.root.classList.remove('is-active');
  }


  render() {
    const type = this.props.type || 'info';
    const text = this.props.text;

    return text ? <div className={"ntf is-" + type} ref="root">
      {text}
    </div> : null;
  }
}
