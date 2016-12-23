import React from 'react';
import cst from '../const';


export default class Tabs extends React.Component {

  constructor(props, context) {
    super(props, context);
  }


  handleClickTabitem(idx) {
    return this.props.changeActiveTab(idx);
  }


  render() {
    return(
      <ul className="tabs">
        {cst.TABS_PERIODS.map((item, i) => {
          return <li
            className={this.props.app.activeTab == i ? "tabs-tab is-active" : "tabs-tab"}
            onClick={this.handleClickTabitem.bind(this, i)}
            key={i}
          >{item}</li>
        })}
      </ul>
    )
  }
}
