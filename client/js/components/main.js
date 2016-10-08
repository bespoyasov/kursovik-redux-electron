import React from 'react';

import helpers from '../helpers';

import Tabs from './tabs';
import Header from './header';


export default class Main extends React.Component {

  constructor(props, context) {
    super(props, context);
  }


  componentDidMount() {
    this.setRandomTheme();
  }


  setRandomTheme() {
    const rand = helpers.getRandomInt(1, 5);
    this.refs.root.classList.add('crs--theme' + rand);
  }


  render() {
    return (
      <div className="crs" ref="root">
        <div className="crs-header">
          <Header {...this.props} />
        </div>

        <div className="crs-tabs">
          <Tabs {...this.props} />
        </div>
      </div>
    )
  }
}
