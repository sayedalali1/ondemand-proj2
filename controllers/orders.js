const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', async (req, res) => {
    try {
        // Look up the user from req.session and populate orders
        const currentUser = await User.findById(req.session.user._id).populate('orders');

        // Render the index view and pass the orders to it
        res.render('orders/index.ejs', { orders: currentUser.orders, user: currentUser });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.get('/new', async (req, res) => {
    res.render('orders/new.ejs', { user: req.session.user });
});

router.post('/', async (req, res) => {
    try {
        // Look up the user from req.session
        const currentUser = await User.findById(req.session.user._id);

        // Modify the date part of the form
        req.body.date = new Date(req.body.date);

        // Push req.body (the new form data object) to the orders array of the current user
        currentUser.orders.push(req.body);

        // Save changes to the user
        await currentUser.save();

        // Redirect back to the orders index view
        res.redirect(`/users/${currentUser._id}/orders`);
    } catch (error) {
        // If any errors, log them and redirect back home
        console.log(error);
        res.redirect('/');
    }
});

router.get('/:orderId', async (req, res) => {
    try {
        // Look up the user from req.session
        const currentUser = await User.findById(req.session.user._id);
        
        // Find the order by the orderId supplied from req.params
        const order = currentUser.orders.id(req.params.orderId);

        // Render the show view, passing the order data in the context object
        res.render('orders/show.ejs', { order: order, user: currentUser });
    } catch (error) {
        // If any errors, log them and redirect back home
        console.log(error);
        res.redirect('/');
    }
});

// controllers/orders.js

router.delete('/:orderId', async (req, res) => {
    try {
      // Look up the user from req.session
      const currentUser = await User.findById(req.session.user._id);
      // Use the Mongoose .deleteOne() method to delete 
      // an order using the id supplied from req.params
      currentUser.orders.id(req.params.orderId).deleteOne();
      // Save changes to the user
      await currentUser.save();
      // Redirect back to the orders index view
      res.redirect(`/users/${currentUser._id}/orders`);
    } catch (error) {
      // If any errors, log them and redirect back home
      console.log(error);
      res.redirect('/')
    }
  });

  // controllers/orders.js

router.get('/:orderId/edit', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const order = currentUser.orders.id(req.params.orderId);
      res.render('orders/edit.ejs', {
        order: order,
      });
    } catch (error) {
      console.log(error);
      res.redirect('/')
    }
  });


  router.put('/:orderId', async (req, res, next) => {
    try {
    const currentUser = await User.findById(req.session.user._id);
    const order = currentUser.orders.id(req.params.orderId);
    order.set(req.body);
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/orders/${req.params.orderId}`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  };
});


module.exports = router;
