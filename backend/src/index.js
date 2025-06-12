const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const productsRoutes = require('./routers/products.js');

const app = express();
const PORT = process.env.PORT || 3000;

const distPath = path.join(__dirname, '../../frontend/dist');
app.use(express.static(distPath));

app.use(cors());
app.use(bodyParser.json());

app.use('/products', productsRoutes);

app.get(/^\/(?!products).*/, (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
