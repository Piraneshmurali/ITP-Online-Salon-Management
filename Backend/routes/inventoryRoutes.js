const express = require("express");
const router = express.Router();
const Product = require("../models/inventoryModel");
const Filter = require('bad-words');
const filter = new Filter();
const nodemailer = require('nodemailer'); // Import nodemailer for sending emails

// Create a transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'achchut656@gmail.com', // Your Gmail email address
    pass: 'oplz ifhh gufz zhcg' // Your Gmail password
  }
});
// Create API route for Create method in CRUD Operations
router.post("/add", async (req, res) => {
  try {
    const createdProduct = await Product.create({
      name: req.body.name,
      type: req.body.type,
      category: req.body.category,
      date: req.body.date,
      rquantity: req.body.rquantity,
      uquantity: req.body.uquantity,
      totalPrice: req.body.totalPrice,
    });

    console.log(createdProduct);
    res.status(201).json({
      message: "Product created successfully",
      product: createdProduct,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating product" });
  }
});

// Create API route for Read method in CRUD Operations
router.get("/products", async (req, res) => {
  try {
    let query = {};
    const { type } = req.query; // Update to use 'type' instead of 'category'
    if (type && type !== "All") { // Update to use 'type' instead of 'category'
      query.category = type; // Update to use 'category' instead of 'type'
    }
    const products = await Product.find(query);
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching products" });
  }
});


// Create API route to fetch a product by its ID
router.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create API route for Delete method in CRUD Operations
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Send email notification if product is low in stock
    if (deletedProduct.rquantity < 10) {
      const mailOptions = {
        from: 'achchut656@gmail.com',
        to: 'muralitharanpiranesh@gmail.com', // Admin's email
        subject: 'Low Stock Notification',
        text: `Dear Supplier,\n\nThis is to notify you that we are running low on stock for the following product:\n\nProduct Name: ${deletedProduct.name}\nRemaining Quantity: ${deletedProduct.rquantity}\n\nPlease restock as soon as possible.\n\nBest regards,\nOLEX`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      deletedProduct: deletedProduct,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting product" });
  }
});


// Create a review for a product
router.post("/reviews/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    // Filter out bad words from the comment
    const isProfane = filter.isProfane(comment);
    console.log('Is profane:', isProfane);
    

    // Check if the comment contains any bad words
    if (isProfane) {
      // If it contains bad words, send a response indicating it's not appropriate
      return res.status(400).json({ success: false, message: 'Your comment contains inappropriate language.' });
    }

    // If the comment is clean, proceed with saving it to the database
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Add the review to the product's reviews array
    product.reviews.push({ rating, comment });

    // Update product's rating and number of reviews
    const totalRating = product.reviews.reduce((acc, review) => acc + review.rating, 0);
    product.rating = totalRating / product.reviews.length;
    product.numReviews = product.reviews.length;

    // Save the product with the new review
    await product.save();

    // Respond with success message
    res.status(201).json({ success: true, message: 'Review created successfully', data: product });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ success: false, error: error.message });
  }
});


// Delete a review for a product
router.delete("/:id/reviews/:reviewId", async (req, res) => {
  try {
    const { id, reviewId } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    const reviewIndex = product.reviews.findIndex(review => review._id.toString() === reviewId);
    if (reviewIndex === -1) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }
    product.reviews.splice(reviewIndex, 1);
    const totalRating = product.reviews.reduce((acc, review) => acc + review.rating, 0);
    product.rating = product.reviews.length > 0 ? totalRating / product.reviews.length : 0;
    product.numReviews = product.reviews.length;
    await product.save();
    res.status(200).json({ success: true, message: 'Review deleted successfully', data: product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create API route for get data in Update method in CRUD Operations
router.get("/update/:id", async (req, res) => {
  try {
    const upProduct = await Product.findById(req.params.id);
    if (!upProduct) {
      return res.status(404).json({ error: "Update Product not found" });
    }
    res.status(200).json(upProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    let updateFields = {
      name: req.body.name,
      type: req.body.type,
      category: req.body.category,
      date: req.body.date,
      rquantity: req.body.rquantity,
      uquantity: req.body.uquantity,
      totalPrice: req.body.totalPrice,
    };
      const u=await Product.findById({_id: req.params.id})
    // Check if uquantity exists in the request body
    if (req.body.uquantity == null) {
      updateFields.uquantity =u.uquantity;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      updateFields,
      { new: true } // To return the updated document
    );

    console.log(updatedProduct);
    res.status(200).json({
      message: "Product updated successfully",
      updatedProduct: updatedProduct,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating product" });
  }
});

module.exports = router;