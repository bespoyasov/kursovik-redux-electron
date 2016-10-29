import React from 'react';
import helpers from '../helpers';
import cst from '../const';


export default class Header extends React.Component {

  constructor(props, context) {
    super(props, context);
  }


  render() {
    const prps = this.props.course;
    const cur = prps.current;
    const curStr = cur.toFixed(2).toString().replace('.', ',');
    const prev = prps.prev;
    const delta = helpers.getDelta(cur, prev);

    return (
      <header className="header">
        <div className="header-title">Курс $ по <span className="smallcaps">ЦБ РФ</span></div>
        <div className="header-value">
          {curStr}<span className="halfspace"></span>{cst.RUB_SIGN}
        </div>
        {delta ? <div className="header-delta">{delta}</div> : null}
      </header>
    )
  }
}
