const express = require('express');
const { createCategory } = require('../controllers/categoryController');

const router = express.Router();

// POST request to create a new product
router.post('/', createCategory);

module.exports = router;
