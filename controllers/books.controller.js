const Book = require('../models/book.model');

async function getAllBooks(req, res) {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books' });
  }
}

async function getBookById(req, res) {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching book' });
  }
}

async function createBook(req, res) {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Only admin can create books' });
    }

    const { title, author, category, price, quantity } = req.body;
    const book = new Book({
      title,
      author,
      category,
      price,
      quantity,
    });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error creating book' });
  }
}

async function updateBookById(req, res) {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Only admin can update books' });
    }

    const bookId = req.params.id;
    const { title, author, category, price, quantity } = req.body;
    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      {
        title,
        author,
        category,
        price,
        quantity,
      },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: 'Error updating book' });
  }
}

async function deleteBookById(req, res) {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Only admin can delete books' });
    }

    const bookId = req.params.id;
    const deletedBook = await Book.findByIdAndDelete(bookId);

    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(202).json({ message: 'Book deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book' });
  }
}

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBookById,
  deleteBookById,
};
