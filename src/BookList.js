import React from 'react';
import './App.css';
import BookListItem from './BookListItem.js';
import useBookApi from './BookApi.js';

function BookList(props) {
  const books = useBookApi('get', 'books');

  // Solange der HTTP-Request noch nicht abgeschlossen ist gebe Null zurück. Oder einen Loading-Spinner.
  if (!books) {
    return null;
  }

  // console.log(books);
  return (
    <div className="ui middle aligned selection divided list">
      { books.map(book => <BookListItem book={book} key={book.isbn} /> )}
    </div>
  );
}

export default BookList;
