import helpers from './helpers';
import cst from './const';


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
  }
};


export default webapi;
