// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
  return res.render('books/details', {title: 'Add Book', books: new book});
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

  let newBook = book({
    "Title" : req.body.title,
    "Description" : "",
    "Price" : req.body.price,
    "Genre" : req.body.genre,
    "Author" : req.body.author
  });

  books.create(newBook, (err,book) => {
    if(err)
      {
          console.error(err);
          res.end(err);
      }
      else
      {
          res.redirect('/books');
      }
  });

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

  let id = req.params.id;

  books.findById(id, (err, currentBook) => {
      if(err)
      {
          console.error(err);
          res.end(err);
      }
      else
      {
          res.render('books/details', {title : "Edit Book", books : currentBook});
      }
  });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

  let id = req.params.id;

  let updatedBook = book({
    "_id": id,
    "Title" : req.body.title,
    "Description" : "",
    "Price" : req.body.price,
    "Genre" : req.body.genre,
    "Author" : req.body.author
  });

  books.updateOne({_id:id}, updatedBook, (err )=> {
    if(err)
    {
        console.error(err);
        res.end(err);
    }
    else
    {
        res.redirect('/books');
    }
  });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

  let id = req.params.id;

  books.remove({_id:id}, (err)=>{
      if(err)
      {
          console.error(err);
          res.end(err);
      }
      else
      {
          res.redirect('/books');
      }
  });
});


module.exports = router;
