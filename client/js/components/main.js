import React from 'react';

import helpers from '../helpers';
import webapi from '../webapi';
import cst from '../const';

import Btn from './btn';
import Tabs from './tabs';
import Header from './header';
import GraphView from './graph';
import Notif from './notification';


export default class Main extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.updateOnlineStatus = this.updateOnlineStatus.bind(this);

    this.state = {
      themeColor: null
    }
  }


  componentDidMount() {
    // show right now
    this.setRandomTheme();
    this.getCourse();
    this.removeLoader();

    // background updates for localstorage
    this.getWeeklyCourse().then(res => {
      this.getMonthlyCourse();
    }).then(res => {
      this.getQuartlyCourse();
    });

    this.getTomorrowCourse();

    window.addEventListener('online',  this.updateOnlineStatus);
    window.addEventListener('offline', this.updateOnlineStatus);
  }


  componentDidUpdate() {
    // when no internet connection will be shown last saved data
    if (this.props.course.quart.data.length > 0) {
      webapi.setLocalCourse(this.props.course);
    }
  }


  setRandomTheme() {
    const rand = helpers.getRandomInt(1, 5);
    this.refs.root.classList.add('crs--theme' + rand);
    this.setState({
      themeColor: cst.COLORS[rand],
    })
  }


  removeLoader() {
    document.getElementById('loader').remove();
  }


  updateOnlineStatus(event) {
    this.props.changeConnectionStatus(navigator.onLine);
  }


  getCourse() {
    return webapi.getTodaysCourse().then(
      result => {
        const cur = result.Value;
        const prev = result.Previous;
        this.props.updateCourseValue(cur, prev);
        this.updateTitle(cur, prev);
      },
      error => {
        const errMsg = !navigator.onLine ? cst.MESSAGES.noConnection : cst.MESSAGES.unknownError;
        this.props.setError(errMsg);
      }
    );
  }


  getTomorrowCourse() {
    return webapi.getCourse(cst.TABS_PERIODS_LATIN[3]).then(

      result => {
        console.log(result);

        // this.props.updateCourseTomorrow(value);
      }
    );
  }


  getWeeklyCourse() {
    return webapi.getCourse(cst.TABS_PERIODS_LATIN[0]).then(

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
        const errMsg = !navigator.onLine ? cst.MESSAGES.noConnection : cst.MESSAGES.unknownError;
        this.props.setError(errMsg);
      }
    );
  }


  getMonthlyCourse() {
    return webapi.getCourse(cst.TABS_PERIODS_LATIN[1]).then(

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
        const errMsg = !navigator.onLine ? cst.MESSAGES.noConnection : cst.MESSAGES.unknownError;
        this.props.setError(errMsg);
      }
    );
  }


  getQuartlyCourse() {
    return webapi.getCourse(cst.TABS_PERIODS_LATIN[2]).then(

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
        const errMsg = !navigator.onLine ? cst.MESSAGES.noConnection : cst.MESSAGES.unknownError;
        this.props.setError(errMsg);
      }
    );
  }


  updateTitle(cur, prev) {
    const curr = helpers.formatSum(cur);
    const delta = helpers.getDelta(cur, prev);
    document.querySelectorAll('title')[0].innerHTML = '1$ = ' + curr + '₽ — ' + delta;
  }


  handleClickReloadBtn() {
    this.props.setLoadingMode(true);

    const self = this;
    self.getCourse().then(() => {
      return self.getWeeklyCourse()
    }).then(() => {
      return self.getMonthlyCourse()
    }).then(() => {
      return self.getQuartlyCourse();
    }).then(() => {
      setTimeout(() => {
        this.props.setError(null);
        this.props.setLoadingMode(false);
      }, 1000)
    }).catch(e => {
      this.props.setError(cst.MESSAGES.unknownLoadingError);
      this.props.setLoadingMode(false);
    })
  }


  render() {
    const themeColor = this.state.themeColor || cst.DEF_COLOR;
    const activeTab = this.props.app.activeTab || 0;

    const isLoading = this.props.app.isLoading || false;
    const btnText = isLoading ? 'Обновляем...' : 'Обновить';
    const connection = this.props.app.connection;

    const error = this.props.app.error;

    return (
      <div className="crs" ref="root">
        {error ? <Notif type="error" text={error} /> : null}

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

        {connection ? <div className="crs-reload">
          <Btn
            text={btnText}
            disabled={isLoading}
            onClick={this.handleClickReloadBtn.bind(this)}
          />
        </div> : null}
      </div>
    )
  }
}
