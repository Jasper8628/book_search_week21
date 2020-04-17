import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

function Books() {
  // Setting our component's initial state
  const [books, setBooks] = useState([]);
  const [formObject, setFormObject] = useState({});
  const [search, setSearch] = useState();
  const [searchTerm, setTerm] = useState({
    term: []
  });

  // Load all books and store them with setBooks
  useEffect(() => {
    //loadBooks()
  }, [])

  // Loads all books and sets them to books
  function loadBooks() {
    API.getBooks()
      .then(res =>
        setBooks(res.data)
      )
      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  function deleteBook(id) {
    API.deleteBook(id)
      .then(res => loadBooks())
      .catch(err => console.log(err));
  }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { value } = event.target;
    setSearch(value)
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    if (search) {
      const term = search.split(" ").join("+");

      console.log(term);
      API.searchBooks(term)
        .then(res => {
          console.log(res.data.items);
          setBooks(res.data.items);
        })
        .catch(err => console.log(err));
    }
  };
  function handleSave(event) {
    const id = event.target.id;
    const book = books.filter(entry => {
      if (entry.id === id) {
        return entry
      }
    })
    console.log(book[0].selfLink);
    API.saveBook({
      selfLink: book[0].selfLink,
      title: book[0].volumeInfo.title,
      authors: book[0].volumeInfo.authors,
      description: book[0].volumeInfo.description,
      smallThumbnail: book[0].volumeInfo.imageLinks.smallThumbnail
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));

  };

  return (
    <Container fluid>
      <div className='row justify-content-center'>
        <div className='col-md-8'>
          <Jumbotron>
            <h1>Google Books Search</h1>
          </Jumbotron>
          <form>
            <Input
              onChange={handleInputChange}
              name="title"
              placeholder="Necromonicon"
            />
            <h2>
              {search}
            </h2>

            <FormBtn
              onClick={handleFormSubmit}
            >
              Search
              </FormBtn>
          </form>
          <br />
          <h1>Results</h1>



          {books.length ? (
            <List>
              {books.map(book => (

                <div key={book._id} className="card">

                  <div className="card-body" >
                    <h5 className="card-title" >{book.volumeInfo.title}</h5>
                      by
                    <h6 className="card-title" >{book.volumeInfo.authors} </h6>
                    <div className="row">

                      <div className="col-md-2">
                        {book.volumeInfo.imageLinks ? (<img
                          src={book.volumeInfo.imageLinks.smallThumbnail
                            // ?(book.volumeInfo.imageLinks.smallThumbnail) : ("")
                          }
                          alt="" />) : ("Oops! Niomage")}

                      </div>
                      <div className="card-text col-md-10">

                        <p style={{ "paddingLeft": "20px" }}>{book.volumeInfo.description}</p>
                      </div>

                    </div>


                    <a href={book.selfLink} className="btn btn-secondary" >View</a>
                    <button onClick={handleSave} href={book.selfLink} className="btn btn-success" id={book.id}>Save</button>
                  </div>
                </div>


                // <ListItem key={book._id}>
                //   <Link to={book.selfLink}>
                //     <strong>
                //       {book.volumeInfo.title} by {book.volumeInfo.authors}
                //     </strong>
                //   </Link>
                //   <DeleteBtn onClick={() => deleteBook(book._id)} />
                // </ListItem>
              ))}
            </List>
          ) : (
              <h3>No Results to Display</h3>
            )}
        </div>

      </div>


    </Container>
  );
}


export default Books;
