import React from 'react';

/*
 * The outer wrapper for a page. Only used for server-side rendering; the client-side mount point
 * is a child of this component.
 */

const Page = React.createClass({

  propTypes: {
    // The initial title of the page. This is computed from <DocumentTitle /> components inside
    // your routes.
    pageTitle: React.PropTypes.string.isRequired,

    // The contents of the page, and the mount point for the client-side app.
    children: React.PropTypes.node.isRequired
  },

  render() {
    return (
      <html>
        <head>
          <title>{this.props.pageTitle}</title>

          <meta charSet="utf-8" />

          <script src="/assets/vendor.bundle.js" />
        </head>

        <body>
          {this.props.children}

          <script src="/assets/app.bundle.js" />
        </body>
      </html>
    );
  }
});

export default Page;
