const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const productsRoutes = require('./routers/products.js');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/products', productsRoutes);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});