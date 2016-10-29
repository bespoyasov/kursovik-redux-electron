import React from 'react';

import helpers from '../helpers';
import webapi from '../webapi';
import cst from '../const';

import Tabs from './tabs';
import Header from './header';
import GraphView from './graph';


export default class Main extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      themeColor: null
    }
  }


  componentDidMount() {
    this.setRandomTheme();
    this.getCourse();
    this.getWeeklyCourse();
  }


  setRandomTheme() {
    const rand = helpers.getRandomInt(1, 5);
    this.refs.root.classList.add('crs--theme' + rand);
    this.setState({
      themeColor: cst.COLORS[rand],
    })
  }


  getCourse() {
    webapi.getTodaysCourse().then(
      result => {
        const cur = result.Value;
        const prev = result.Previous;
        this.props.updateCourseValue(cur, prev);
        this.updateTitle(cur, prev);
      },
      error => {
        const errMsg = cst.MESSAGES.unknownError;
        this.props.showErrorNotification(errMsg);
      }
    );
  }


  getWeeklyCourse() {
    webapi.getWeeklyCourse().then(

      result => {
        let data = [], labels = [];

        for (let itm of result) {
          const lgt = labels.length;
          //if (lgt % 2 == 0) labels.push(helpers.formatDateFromStr(itm.attributes.Date));
          //else labels.push('');
          labels.push(helpers.formatDayFromStr(itm.attributes.Date));
          data.push(parseFloat(itm.children[1].content.replace(',', '.')).toFixed(2));
        }

        this.props.updateCourseWeek(data, labels);
      },
      error => {
        const errMsg = cst.MESSAGES.unknownError;
        this.props.showErrorNotification(errMsg);
      }
    );
  }


  updateTitle(cur, prev) {
    const curr = helpers.formatSum(cur);
    const delta = helpers.getDelta(cur, prev);
    document.querySelectorAll('title')[0].innerHTML = '1$ = ' + curr + '₽ — ' + delta;
  }


  render() {
    const themeColor = this.state.themeColor || cst.DEF_COLOR;

    return (
      <div className="crs" ref="root">
        <div className="crs-header">
          <Header {...this.props} />
        </div>

        <div className="crs-tabs">
          <Tabs {...this.props} />
        </div>

        <div className="crs-graph">
          <GraphView color={themeColor} {...this.props} />
        </div>
      </div>
    )
  }
}
