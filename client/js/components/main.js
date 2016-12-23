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

    this.getMonthlyCourse();
    this.getQuartlyCourse();
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
    webapi.getCourse(cst.TABS_PERIODS_LATIN[0]).then(

      result => {
        let data = [], labels = [], fulllabels = [];

        for (let itm of result) {
          const lgt = labels.length;
          labels.push(helpers.formatDayFromStr(itm.attributes.Date));
          fulllabels.push(helpers.formatDateFromStr(itm.attributes.Date));
          data.push(parseFloat(itm.children[1].content.replace(',', '.')).toFixed(2));
        }

        this.props.updateCourseWeek(data, labels, fulllabels);
      },
      error => {
        const errMsg = cst.MESSAGES.unknownError;
        this.props.showErrorNotification(errMsg);
      }
    );
  }


  getMonthlyCourse() {
    webapi.getCourse(cst.TABS_PERIODS_LATIN[1]).then(

      result => {
        let data = [], labels = [], fulllabels = [];
        const size = result.length;

        for (let i in result) {
          const itm = result[i];
          const lgt = labels.length;
          const label =
            (i == 0 || i == Math.floor((size - 1) / 2) || i == size - 1) ?
            helpers.formatDateFromStr(itm.attributes.Date) :
            '';

          labels.push(label);
          fulllabels.push(helpers.formatDateFromStr(itm.attributes.Date));
          data.push(parseFloat(itm.children[1].content.replace(',', '.')).toFixed(2));
        }

        this.props.updateCourseMonth(data, labels, fulllabels);
      },
      error => {
        const errMsg = cst.MESSAGES.unknownError;
        this.props.showErrorNotification(errMsg);
      }
    );
  }


  getQuartlyCourse() {
    webapi.getCourse(cst.TABS_PERIODS_LATIN[2]).then(

      result => {
        let data = [], labels = [], fulllabels = [];
        const size = result.length;

        for (let i in result) {
          const itm = result[i];
          const lgt = labels.length;
          const label =
            (i == 0 || i == Math.floor((size - 1) / 3) ||
            i == 2 * Math.floor((size - 1) / 3) || i == size - 1) ?
            helpers.formatDateFromStr(itm.attributes.Date) :
            '';

          labels.push(label);
          fulllabels.push(helpers.formatDateFromStr(itm.attributes.Date));
          data.push(parseFloat(itm.children[1].content.replace(',', '.')).toFixed(2));
        }

        this.props.updateCourseQuart(data, labels, fulllabels);
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
    const activeTab = this.props.app.activeTab || 0;

    return (
      <div className="crs" ref="root">
        <div className="crs-header">
          <Header {...this.props} />
        </div>

        <div className="crs-tabs">
          <Tabs {...this.props} />
        </div>

        <div className="crs-graph">
          <GraphView
            color={themeColor}
            period={cst.TABS_PERIODS_LATIN[activeTab]}
            {...this.props}
          />
        </div>
      </div>
    )
  }
}
