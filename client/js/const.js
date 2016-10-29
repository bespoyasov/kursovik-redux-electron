const cst = {
  CB_URL_TODAY: 'http://www.cbr-xml-daily.ru/daily_json.js',
  CB_URL_DATE: 'http://www.cbr.ru/scripts/XML_dynamic.asp',
  CB_URL_DATE_QUERY_1: 'date_req1=',
  CB_URL_DATE_QUERY_2: 'date_req2=',
  CB_URL_DATE_QUERY_3: '&VAL_NM_RQ=R01235',

  USD_CHAR: 'USD',
  RUB_SIGN: '₽' || 'Р',

  COLORS: ['#ffffff', '#009dff', '#695aa0', '#254b6e', '#e58549', '#9b14ff'],
  DEF_COLOR: '#ffffff',

  DAYS: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
  MONTHS: ['янв', 'фев', 'март', 'апр', 'мая', 'июн', 'июл', 'авг', 'сент', 'окт', 'нояб', 'дек'],

  CHART_OPTIONS: {
    animation: false,
    responsive: true,
    maintainAspectRatio: true,
    legend: false,
    tooltips: {
      mode: 'x-axis',
      backgroundColor: 'rgba(255,255,255,0.9)',
      titleFontStyle: 'normal',
      titleMarginBottom: 2,
      xPadding: 14,
      yPadding: 7,
      cornerRadius: 3,
      titleFontSize: 0,
      titleMarginBottom: 0,
      bodyMarginBottom: 3,
    },
    scales: {
      xAxes: [{
        gridLines:{
          color: 'rgba(255,255,255,0.1)',
          zeroLineColor: 'rgba(255,255,255,0.3)',
        },
        ticks: {
          fontColor: 'rgba(255,255,255,.8)',
          fontFamily: 'Helvetica, sans-serif',
        }
      }],
      yAxes: [{
        gridLines:{
          color: 'rgba(255,255,255,0.1)',
          zeroLineColor: 'rgba(255,255,255,0.3)',
        },
        ticks: {
          fontColor: 'rgba(255,255,255,.8)',
          fontFamily: 'Helvetica, sans-serif',
        }
      }]
    }
  },
  CHART_DATASET_OPTIONS: {
    fill: false,
    lineTension: 0,
    borderWidth: 1,
    borderColor: '#ffffff',
    pointBorderColor: '#ffffff',
    pointBackgroundColor: '#ffffff',
    pointBorderWidth: 1,
    pointHoverBackgroundColor: '#ffffff',
    pointHoverBorderColor: '#ffffff',
    pointRadius: 3,
    lineColor: '#ffffff',
  },

  MESSAGES: {
    unknownError: 'Что-то пошло не так. Попробуйте обновить курс'
  },

  UPDATE_COURSE_VALUE: 'UPDATE_COURSE_VALUE',
  UPDATE_COURSE_WEEK: 'UPDATE_COURSE_WEEK',
}


export default cst;
