import cst from './const';


const helpers = {

  getRandomInt: (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },


  getFormattedDate: (tmstmp = false) => {
    let date = new Date();
    if (tmstmp) date.setTime(tmstmp);

    const year = date.getFullYear();

    const month =
      (date.getMonth() + 1) < 10 ?
      '0' + (date.getMonth() + 1).toString() :
      (date.getMonth() + 1);

    const day =
      date.getDate() < 10 ?
      '0' + date.getDate().toString() :
      date.getDate();

    return (day + '/' + month + '/' + year);
  },


  formatSum: (sum) => {
    return parseFloat(sum).toFixed(2).toString().replace('.', ',');
  },


  formatDateFromStr: (date) => {
    const month = Math.max(parseInt(date.substr(date.indexOf('.')+1, 2)) - 1, 0);
    const dt = parseInt(date.substr(0, 2));
    return dt + ' ' + cst.MONTHS[month];
  },


  formatDayFromStr: (date) => {
    const newdate = new Date();
    const mh = Math.max(parseInt(date.substr(date.indexOf('.')+1, 2)) - 1, 0);
    const dt = parseInt(date.substr(0, 2));
    const yr = parseInt(date.substr(date.lastIndexOf('.')+1, 4));

    newdate.setFullYear(yr)
    newdate.setMonth(mh)
    newdate.setDate(dt);
    return cst.DAYS[newdate.getDay()].toUpperCase();
  },


  getDelta: (cur, prev) => {
    let delta, deltaPositive, deltaStr;
    if (prev) {
      delta = Math.abs((cur - prev).toFixed(2)).toString().replace('.', ',');
      deltaPositive = cur - prev > 0;
      deltaStr =
        delta > 0 ?
        '▲ ' + delta + ' ' + cst.RUB_SIGN :
        '▼ ' + delta + ' ' + cst.RUB_SIGN;

      return deltaStr;
    }
    else return false;
  },


  getDateAgo: (days) => {
    let now = (new Date()).getTime();
    let ago = now - 1000*60*60*24*days;
    let agoTime = new Date();
    agoTime.setTime(ago);
    let dt = agoTime.getDate();
    if (dt < 10) dt = '0' + dt.toString();
    return dt;
  },


  getMonthAgo: (days) => {
    let now = (new Date()).getTime();
    let ago = now - 1000*60*60*24*days;
    let agoTime = new Date();
    agoTime.setTime(ago);
    let mt = agoTime.getMonth() + 1;
    if (mt < 10) mt = '0' + mt.toString();
    return mt
  },


  getYearAgo: (days) => {
    let now = (new Date()).getTime();
    let ago = now - 1000*60*60*24*days;
    let agoTime = new Date();
    agoTime.setTime(ago);
    return agoTime.getFullYear();
  }
}


export default helpers;
