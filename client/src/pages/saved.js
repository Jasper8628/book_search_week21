import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";


function Saved() {
    useEffect(() => {
        loadBooks()
    }, [])

    const [books, setBooks] = useState([]);

    // Loads all books and sets them to books
    function loadBooks() {
        API.getBooks()
            .then(res =>
                setBooks(res.data)
            )
            .catch(err => console.log(err));
    };
    return (

        <Container fluid>
            <div className='row justify-content-center'>
                <div className='col-md-8'>
                    <Jumbotron>
                        <h1>Google Books Search</h1>
                    </Jumbotron>
        
                    <br />
                    <h1>Saved Books</h1>

                    {books.length ? (
                        <List>
                            {books.map(book => (

                                <div key={book._id} className="card">

                                    <div className="card-body" >
                                        <h5 className="card-title" >{book.title}</h5>
                                          by
                                        <h6 className="card-title" >{book.authors} </h6>
                                        <div className="row">

                                            <div className="col-md-2">
                                                <img
                                                    src={book.smallThumbnail ?
                                                        (book.smallThumbnail) : ("")}
                                                    alt="" />
                                            </div>
                                            <div className="card-text col-md-10">

                                                <p style={{ "paddingLeft": "20px" }}>{book.description}</p>
                                            </div>

                                        </div>
                                        <a href={book.selfLink} className="btn btn-secondary" >View</a>
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
    )
}

export default Saved
