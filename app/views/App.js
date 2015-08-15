import React from 'react';
import {RouteHandler} from 'react-router';
import {Provider} from 'react-redux';

const App = React.createClass({
  render() {
    return (
      <Provider store={this.props.store}>
        {() => <RouteHandler />}
      </Provider>
    );
  }
});

export default App;
