const express = require('express');
const { createProduct } = require('../controllers/productController');

const router = express.Router();

// POST request to create a new product
router.post('/', createProduct);

module.exports = router;
