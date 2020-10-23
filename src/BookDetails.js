import React from 'react';
import './App.css';
import Moment from 'react-moment';
import useBookApi from './BookApi.js';
import { withRouter } from 'react-router-dom';

function BookDetails(props) {

  const book = useBookApi('get',`book/${props.match.params.isbn}`)

  if (!book) {
    return null;
  }

  const getRatings = () => {
    return Array.apply(null, {length: book.rating}).reduce(
      (acc, _, index) => {acc.push(index); return acc}, []
    )
  }

  return (
    <div>
      <h1>{book.title}</h1>
      <div className="ui divider"></div>
      <div className="ui grid">
        <div className="four wide column">
          <h4>Autoren</h4>
          <p>
            {book.authors.join(", ")}
          </p>
        </div>
        <div className="four wide column">
          <h4>ISBN</h4>
          <p>
            {book.isbn}
          </p>
        </div>
        <div className="four wide column">
          <h4>Erschienen</h4>
          <p>
            <Moment format="DD.MM.YYYY">{book.published}</Moment>
          </p>
        </div>
        <div className="four wide column">
          <h4>Rating</h4>
          {getRatings().map((index) => <i key={index} className="yellow star icon"></i>)}
        </div>
        <div className="four wide column">
          <h4>Beschreibung</h4>
          <p>
            {book.description}
          </p>
          <div className="ui small images">
            {book.thumbnails.map((thumbnail) => <img key={thumbnail.url} alt="" src={ thumbnail.url } />)}
          </div>
        </div>
      </div>
      <button type="button" name="button" className="ui white button" onClick={props.history.goBack}>Zurück</button>
    </div>
  );
}

export default withRouter(BookDetails);
