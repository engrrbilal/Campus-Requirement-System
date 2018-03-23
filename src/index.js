import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import * as firebase from 'firebase'
import registerServiceWorker from './registerServiceWorker';
const store = configureStore();
var config = {
  apiKey: "AIzaSyDZYNeAKrEn7-E0IVMUDNHUCOJlpdqoDP4",
  authDomain: "campus-recuirement-syste-70812.firebaseapp.com",
  databaseURL: "https://campus-recuirement-syste-70812.firebaseio.com",
  projectId: "campus-recuirement-syste-70812",
  storageBucket: "campus-recuirement-syste-70812.appspot.com",
  messagingSenderId: "263577663677"
};
  firebase.initializeApp(config);
ReactDOM.render(<MuiThemeProvider>
                  <Provider store={store}>
                      <App />
                  </Provider>
              </MuiThemeProvider>, document.getElementById('root'));
registerServiceWorker();
