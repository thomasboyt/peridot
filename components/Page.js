import React from 'react';

const Page = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    children: React.PropTypes.node.isRequired
  },

  render() {
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
          <link href="/normalize.css" rel="stylesheet" />
          <link href="/style.css" rel="stylesheet" />
        </head>
        <body>
          {this.props.children}
        </body>
      </html>
    );
  }
});

export default Page;
