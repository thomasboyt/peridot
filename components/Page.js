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
          <link href="http://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800" rel="stylesheet" type="text/css" />
          <link href="/normalize.css" rel="stylesheet" />
          <link href="/style.css" rel="stylesheet" />

          <script src="/js/vendor.bundle.js" />
        </head>

        <body>
          <h1 className="blog-title">
            <a href="/">Loud Places</a>
          </h1>

          {this.props.children}
        </body>
      </html>
    );
  }
});

export default Page;
