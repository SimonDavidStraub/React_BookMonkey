import React, {useState} from 'react';
import {withRouter} from 'react-router-dom'
import axios from 'axios';

// Lang-Schreibweise Objekt: { title: title, url: url }
const buildThumbnail = (title, url) => {return {title, url}}

function BookCreate(props) {
  const [title, setTitle] = useState('Mein neues Buch');
  const [subtitle, setSubtitle] = useState('sub sub');
  const [isbn, setIsbn] = useState(Math.floor(Math.random() * 9999999999999 + 1111111111).toString());
  const [description, setDescription] = useState('desc');
  const [authors, setAuthors] = useState(['Max', 'Mux']);
  const [published, setPublished] = useState("2020-05-21");
  const [thumbnails, setThumbnails] = useState([buildThumbnail(
    'title', `https://picsum.photos/200/300?random=${Math.floor(Math.random() * 256 + 1)}`)
  ]);

  const book = () => {
    return {
      title, subtitle, isbn, description,
      authors, thumbnails, published
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault() // stops default reloading behaviour
    axios.post('https://api3.angular-buch.com/books', book())
      .then((resp) => {
        console.log(resp, book())
        props.history.push('/books')
      });
  }

  const removeElem = (getState, setState) => {
    const localArray = [...getState]
    localArray.splice(-1, 1)
    setState(localArray)
  }

  return (
    <form className="ui form" style={{margin: '0 30px 0 30px'}} onSubmit={handleSubmit}>
      <br />
      <label>Buchtitel</label>
      <input placeholder="Titel" value={title} onChange={(e) => setTitle(e.target.value)} />

      <br /><br />
      <label>Untertitel</label>
      <input placeholder="Subtitle" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />

      <br /><br />
      <label>Isbn</label>
      <input placeholder="Isbn" value={isbn} onChange={(e) => setIsbn(e.target.value)} />

      <br /><br />
      <label>Erscheinungsdatum</label>
      <input type="date" value={published} onChange={(e) => setPublished(e.target.value)} />

      <br /><br />
      <label>Authoren</label>
      <button className="ui mini button" type="button" onClick={() => setAuthors([...authors, ''])}>
        +
      </button>
      <button className="ui mini button" type="button" onClick={() => removeElem(authors, setAuthors)}>
        -
      </button>
      { authors.map((author, index) => {
        const onChange = (e) => {
          const authorsLocal = [...authors]
          authorsLocal[index] = e.target.value
          setAuthors(authorsLocal)
        }
        return <input key={index} placeholder="Author" value={author} onChange={onChange} />
      }) }

      <br /><br />
      <label>Beschreibung</label>
      <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />

      <br /><br />
      <label>Bilder</label>
      <button className="ui mini button" type="button" onClick={() => setThumbnails([...thumbnails, buildThumbnail('','')])}>
        +
      </button>
      <button className="ui mini button" type="button" onClick={() => removeElem(thumbnails, setThumbnails)}>
        -
      </button>
      { thumbnails.map((thumbnail, index) => {
        const onChange = (e, key) => {
          const thumbnailsLocal = [...thumbnails]
          thumbnailsLocal[index][key] = e.target.value
          setThumbnails(thumbnailsLocal)
        }
        return <div key={index} className="fields">
          <div className="nine wide field">
            <input placeholder="Title" value={thumbnail.title} onChange={(e) => onChange(e, 'title')} />
          </div>
          <div className="seven wide field">
            <input placeholder="URL" value={thumbnail.url} onChange={(e) => onChange(e, 'url')} />
          </div>
        </div>
      }) }

      <br /><br />
      <button className="ui button">Submit</button>
    </form >
  )
}

// Fuer Weiterleitung nach Submit
export default withRouter(BookCreate)
