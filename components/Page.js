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
          <link href="http://fonts.googleapis.com/css?family=Dosis:400,500,600,700" rel="stylesheet" type="text/css" />
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
