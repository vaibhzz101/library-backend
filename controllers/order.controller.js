const Order = require('../models/order.model');
const Book = require('../models/book.model');


async function placeOrder(req, res) {
  try {
    const { books: bookIds } = req.body;

   
    const selectedBooks = await Book.find({ _id: { $in: bookIds } });

    if (!selectedBooks.length) {
      return res.status(400).json({ message: 'No valid books selected for the order' });
    }

    const totalAmount = selectedBooks.reduce((total, book) => total + book.price, 0);

    const order = new Order({
      user: req.user._id, 
      books: bookIds,
      totalAmount,
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error placing order' });
  }
}


async function getAllOrders(req, res) {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Only admin can view all orders' });
    }

    const orders = await Order.find().populate('user').populate('books');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
}

module.exports = {
  placeOrder,
  getAllOrders,
};
