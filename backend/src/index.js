const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');


const productsRoutes = require('./routers/products.js');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.use(cors());
app.use(bodyParser.json());

app.use('/products', productsRoutes);

app.get(/^\/(?!products).*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});