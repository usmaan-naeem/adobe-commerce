const express = require('express');
const { fetchProducts } = require('../services/productSearch');
const { updateProductPricesBulk } = require("../services/updateProducts")
const { createProduct } = require("../controllers/productController")
const { searchProduct } = require('../controllers/searchProduct');

const router = express.Router();

// POST request to create a new product
router.post('/', createProduct);
router.get('/search', async (req, res) => {
    try {
    //   const { phrase, pageSize, currentPage } = req.body;
      const products = await fetchProducts();
      await updateProductPricesBulk(products);
      console.log(products.length)
      res.json(products);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });
router.post('/searchProduct', searchProduct);

module.exports = router;
