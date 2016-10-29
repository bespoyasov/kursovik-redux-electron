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
      ls.setItem('kursovik_current', cur);
      ls.setItem('kursovik_prev', prev);
    }
  },


  getWeeklyCourse: () => {
    const prevDate = helpers.getDateAgo(8);
    const prevMonth = helpers.getMonthAgo(8);
    const prevYear = helpers.getYearAgo(8);
    const now = new Date();
    const nowDate = now.getDate();
    const nowMonth = now.getMonth() + 1;
    const nowYear = now.getFullYear();

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
  }
};


export default webapi;
