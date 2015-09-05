import React from 'react';
import {Link} from 'react-router';

/*
 * A wrapper applied around the route.
 *
 * Applying a transition around the child element allows you to animate page navigation.
 */
const Wrapper = React.createClass({
  propTypes: {
    children: React.PropTypes.node.isRequired
  },

  render() {
    return (
      <div className="container">
        <header>
          <h1 className="blog-title">
            <Link to="index">My Blog</Link>
          </h1>
        </header>

        <main>
          {this.props.children}
        </main>
      </div>
    );
  }
});

export default Wrapper;
