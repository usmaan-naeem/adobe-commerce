const express = require('express');
const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();

app.use(bodyParser.json());

app.use(express.json());
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

const PORT = process.env.PORT || 8082;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
