import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import {Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes/main';
import store from './store/configureStore';
import { persistStore } from 'redux-persist';
import {Provider} from 'react-redux';
import {loginUnauthorized} from './actions/authActions';
import cookie from 'react-cookie';

//import 'bootstrap';
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.css';

const history = syncHistoryWithStore(browserHistory, store);

class Launcher extends React.Component {

  constructor() {
    super();
    this.state = { isStoreLoaded: false };
  }

  componentWillMount() {
    let keep_login = cookie.load('keep_login');
    persistStore(store, {whitelist: ['auth'], keyPrefix: 'gvcrm_store:'}, (err, restoredState) => {
      if(restoredState && restoredState.auth && !restoredState.auth.keep_session_id && !keep_login) {
        //remove session_id from state
        store.dispatch(loginUnauthorized());
      }
      this.setState({ isStoreLoaded: true });
    });
    // important: keep this flag in cookie for keeping user as 'logged in' between browser refresh
    cookie.save('keep_login', true, { path: '/' });
  }

  render() {
    if(!this.state.isStoreLoaded) {
      // TODO make loader when initial state is loading from webstorage
      return false;
    }
    return (<Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>);
  }
}

render(
  <Launcher />,
  document.getElementById('app')
);
