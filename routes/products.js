const express = require('express');
const { createProduct } = require('../controllers/productController');
const { searchProduct } = require('../controllers/searchProduct');

const router = express.Router();

// POST request to create a new product
router.post('/', createProduct);
router.post('/searchProduct', searchProduct);

module.exports = router;
