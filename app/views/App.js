import React from 'react';
import {Wrapper} from '../projectRequire';

const App = React.createClass({
  // contextTypes: {
  //   router: React.PropTypes.func.isRequired
  // },
  // mixins: [
  //   State
  // ],

  render() {
    const key = this.props.location.key;

    return (
      <Wrapper>
        <span key={key}>
          {this.props.children}
        </span>
      </Wrapper>
    );
  }
});

export default App;
