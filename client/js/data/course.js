import webapi from '../webapi';


const course =
  window.navigator.onLine ?
  {
    prev: 0,
    current: 0,
    tomorrow: 0,
    week: {
      data: [],
      labels: [],
      fulllabels: []
    },
    month: {
      data: [],
      labels: [],
      fulllabels: []
    },
    quart: {
      data: [],
      labels: [],
      fulllabels: []
    },

    error: false,
  } :
  webapi.getLocalCourse()


export default course;
