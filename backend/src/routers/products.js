const express = require('express');
const router = express.Router();

const productsData = require('../data/products.json');
const products = productsData.products;

router.get('/', (req, res) => {
    res.json(productsData);
});

router.get('/filter', (req, res) => {
    let filteredProducts = products;

    Object.entries(req.query).forEach(([key, value]) => {
        if (!value) return;

        filteredProducts = filteredProducts.filter(product => {
            const productValue = product[key];

            if (productValue === undefined) {
                return false;
            }

            if (!isNaN(productValue) && !isNaN(value)) {
                return Number(productValue) === Number(value);
            }

            if (typeof productValue === 'string') {
                return productValue.toLowerCase() === value.toLowerCase();
            }

            return productValue === value;
        });
    });

    res.json(filteredProducts);
});

router.get('/search', (req, res) => {
    const {q} = req.query;

    if (!q || q.trim() === '') {
        return res.status(400).json({message: 'Search query is required'});
    }

    const query = q.trim().toLowerCase();

    const results = products.filter(product => {
        const title = product.title?.toLowerCase() || '';
        const description = product.description?.toLowerCase() || '';
        return title.includes(query) || description.includes(query);
    });

    res.json({
            products: [...results],
            total: results.length,
            skip: 0,
            limit: 10
        }
    );
});

router.get('/:id', (req, res) => {
    const product = products.find(p => p.id === +req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({message: 'Not found'});
    }
});

module.exports = router;
