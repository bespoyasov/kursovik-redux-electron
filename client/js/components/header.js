import React from 'react';
import helpers from '../helpers';
import cst from '../const';


export default class Header extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
  }


  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.app.isLoading == false
  }


  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.app.isLoading ||
      !prevProps.app.connection && this.props.app.connection
    ) {
      this.refs.root.classList.add('is-shaking');
    }

    document.addEventListener('transitionend', this.handleTransitionEnd);
  }


  componentWillUnmount() {
    document.removeEventListener('transitionend', this.handleTransitionEnd);
  }


  handleTransitionEnd() {
    this.refs.root.classList.remove('is-shaking');
  }


  render() {
    const prps = this.props.course;
    const cur = prps.current;
    const curStr = cur.toFixed(2).toString().replace('.', ',');
    const prev = prps.prev;
    const delta = helpers.getDelta(cur, prev);
    const tomorrow = prps.tomorrow;

    return (
      <header className="header" ref="root">
        <div className="header-title">Курс $ по <span className="smallcaps">ЦБ РФ</span></div>
        <div className="header-value" ref="value">
          {curStr}<span className="halfspace"></span>{cst.RUB_SIGN}
        </div>

        {delta ? <div className="header-delta">{delta}</div> : null}

        {tomorrow ?
        <div className="header-tomorrow">
          Завтра: {tomorrow} {cst.RUB_SIGN}
        </div> :
        null}

      </header>
    )
  }
}
