import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import browserHistory from 'react-router/lib/browserHistory';
import IntlWrapper from '../../intl/containers/IntlWrapper';
import routes from '../../../routes';
import AppStyles from '../styles/AppStyles';

export default function App(props) {
  /**
   * key={Math.random()} within the Router removes the error message
   * within the console, but also has side effects like changing
   * the redux state to initial. Be careful!
   */
  return (
    <Provider store={props.store}>
      <IntlWrapper>
        <Router key={Math.random()} history={browserHistory} routes={routes} />
      </IntlWrapper>
    </Provider>
  );
}

App.propTypes = {
  store: React.PropTypes.object.isRequired,
};
