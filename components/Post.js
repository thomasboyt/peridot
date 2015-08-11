import React from 'react';
import moment from 'moment';


const DATE_STRING = 'ddd. MMMM Do, YYYY';

const Post = React.createClass({
  render() {
    const {title, date} = this.props;

    return (
      <div>
        <h1>{title}</h1>
        <h3>{moment(date, 'MM/DD/YY').format(DATE_STRING)}</h3>
      </div>
    );
  }
});

export default Post;
