import React from 'react';
import './App.css';
import { withRouter } from 'react-router-dom';
// import { Link } from 'react-router-dom';


function BookListItem(props) {
  return (
    // <Link to={`/books/${props.book.isbn}`}>
      <div className="item" onClick={() => props.history.push(`/books/${props.book.isbn}`) }>
        {props.book.thumbnails && props.book.thumbnails.length && <img className="ui tiny image" alt="" src={ props.book.thumbnails[0].url } />}
        <div className="content">
          <div className="header">
            { props.book.title }
          </div>
          <div className="description">
            { props.book.description }
          </div>
          <div className="metadata">
            <span>{ props.book.authors.join(", ") }</span>
            <br />
            ISBN { props.book.isbn }
          </div>
        </div>
      </div>
    // </Link>
  );
}

export default withRouter(BookListItem);
