import cst from '../const';


const connection = window.navigator.onLine;


const app = {
  activeTab: 0,
  isLoading: false,
  error: !connection ? cst.MESSAGES.noConnection : null,
  connection: connection
};


export default app;
