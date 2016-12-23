import helpers from './helpers';
import cst from './const';
import xmlParse from 'xml-parser';


const webapi = {

  getTodaysCourse: () => {
    return new Promise(function(resolve, reject){
      fetch(cst.CB_URL_TODAY).then(res => {
        return res.json();
      }).then(res => {
        resolve(res.Valute.USD);
      }).
      catch(error => {
        reject(error);
      })
    });
  },


  updateCourseValue: (cur, prev) => {
    const ls = window.localStorage;

    if (ls) {
      ls.setItem(cst.LS.current, cur);
      ls.setItem(cst.LS.prev, prev);
    }
  },


  getCourse: (period) => {
    let daysAgo = 8;

    switch (period) {
      case cst.TABS_PERIODS_LATIN[0]: daysAgo = 8; break;
      case cst.TABS_PERIODS_LATIN[1]: daysAgo = 30; break;
      case cst.TABS_PERIODS_LATIN[2]: daysAgo = 90; break;
      default: break;
    }

    const prevDate = helpers.getDateAgo(daysAgo),
          prevMonth = helpers.getMonthAgo(daysAgo),
          prevYear = helpers.getYearAgo(daysAgo),

          now = new Date(),
          nowDate = now.getDate(),
          nowMonth = now.getMonth() + 1,
          nowYear = now.getFullYear();

    return new Promise(function(resolve, reject){
      fetch(
        cst.CB_URL_DATE + '?' +
        cst.CB_URL_DATE_QUERY_1 + prevDate + '/' + prevMonth + '/' + prevYear + '&' +
        cst.CB_URL_DATE_QUERY_2 + nowDate + '/' + nowMonth + '/' + nowYear +
        cst.CB_URL_DATE_QUERY_3
      ).then(res => {
        return res.text();
      }).then(res => {
        resolve(xmlParse(res).root.children);
      }).
      catch(error => {
        reject(error);
      })
    });
  },


  // saveSettingsAndData: (app, course) => {
  //   const ls = window.localStorage;
  //
  //   if (ls) {
  //     ls.setItem(cst.LS.app, JSON.stringify(app));
  //     ls.setItem(cst.LS.course, JSON.stringify(course));
  //   }
  // },
  //
  //
  // getSettingsAndData: () => {
  //   const ls = window.localStorage;
  //   let app = null, course = null;
  //
  //   if (ls) {
  //     app = JSON.parse(ls.getItem(cst.LS.app));
  //     course = JSON.parse(ls.getItem(cst.LS.course));
  //   }
  //
  //   return { app, course }
  // }
};


export default webapi;
