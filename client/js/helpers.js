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


  getDelta: (cur, prev) => {
    let delta, deltaPositive, deltaStr;
    if (prev) {
      delta = Math.abs((cur - prev).toFixed(2)).toString().replace('.', ',');
      deltaPositive = cur - prev > 0;
      deltaStr =
        delta > 0 ?
        '▲ ' + delta + ' ₽' :
        '▼ ' + delta + ' ₽';

      return deltaStr;
    }
    else return false;
  }
}


export default helpers;
