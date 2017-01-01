import helpers from './helpers';
import cst from './const';
import xmlParse from 'xml-parser';


const webapi = {

  // deprecated
  // getTodaysCourse: () => {
  //   return new Promise(function(resolve, reject){
  //     fetch(cst.CB_URL_TODAY).then(res => {
  //       return res.json();
  //     }).then(res => {
  //       resolve(res.Valute.USD);
  //     }).
  //     catch(error => {
  //       reject(error);
  //     })
  //   });
  // },


  getCourse: (period) => {
    let daysAgo = 1;

    switch (period) {
      case cst.TABS_PERIODS_LATIN[0]: daysAgo = 8; break;
      case cst.TABS_PERIODS_LATIN[1]: daysAgo = 30; break;
      case cst.TABS_PERIODS_LATIN[2]: daysAgo = 90; break;
      case cst.TABS_PERIODS_LATIN[3]: daysAgo = -1; break;
      case cst.TABS_PERIODS_LATIN[4]: daysAgo = 4; break; // 4 — for weekend gutter in 2 empty days
      default: break;
    }

    const prevDate = helpers.getDateAgo(daysAgo),
          prevMonth = helpers.getMonthAgo(daysAgo),
          prevYear = helpers.getYearAgo(daysAgo),
          now = new Date(),
          nowDate = now.getDate() < 10 ? '0' + now.getDate() : now.getDate(),
          nowMonth = (now.getMonth() + 1) < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1,
          nowYear = now.getFullYear();

    const fetchChangeUrl =
      daysAgo > 0 ?
      cst.CB_URL_DATE_QUERY_1 + prevDate + '/' + prevMonth + '/' + prevYear + '&' +
      cst.CB_URL_DATE_QUERY_2 + nowDate + '/' + nowMonth + '/' + nowYear
      :
      cst.CB_URL_DATE_QUERY_1 + nowDate + '/' + nowMonth + '/' + nowYear + '&' +
      cst.CB_URL_DATE_QUERY_2 + prevDate + '/' + prevMonth + '/' + prevYear;

    const fetchUrl = cst.CB_URL_DATE + '?' + fetchChangeUrl + cst.CB_URL_DATE_QUERY_3;


    return new Promise(function(resolve, reject){
      fetch(fetchUrl).then(res => {
        return res.text();
      }).then(res => {
        resolve(xmlParse(res).root.children);
      }).
      catch(error => {
        reject(error);
      })
    });
  },


  setLocalCourse: (course) => {
    const ls = window.localStorage;

    try {
      const item = cst.LS.course;
      ls.setItem(item, JSON.stringify(course));
    }
    catch (er) {}
  },


  getLocalCourse: () => {
    const ls = window.localStorage;

    try {
      const item = cst.LS.course;
      return JSON.parse(ls.getItem(item))
    }
    catch (er) {}
  }

};


export default webapi;
