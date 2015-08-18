import React from 'react';
import {RouteHandler} from 'react-router';
import {Wrapper} from '../projectRequire';

const App = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  render() {
    const name = this.context.router.getCurrentPath();

    return (
      <Wrapper>
        <RouteHandler key={name} />
      </Wrapper>
    );
  }
});

export default App;
