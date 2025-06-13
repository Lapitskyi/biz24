const express = require('express');
const router = express.Router();

const productsData = require('../data/products.json');
const products = productsData.products;

router.get('/', (req, res) => {
    res.json(productsData);
});

router.get('/filter', (req, res) => {
    let filteredProducts = products;
    const { category, brand, price } = req.query;

    if (category) {
        const categoryArray = Array.isArray(category) ? category : [category];
        filteredProducts = filteredProducts.filter(product =>
            categoryArray.includes(product.category)
        );
    }

    if (brand) {
        const brandArray = Array.isArray(brand) ? brand : [brand];
        filteredProducts = filteredProducts.filter(product =>
            brandArray.includes(product.brand)
        );
    }

    if (price) {
        const min = Number(price.min);
        const max = Number(price.max);

        filteredProducts = filteredProducts.filter(product => {
            const productPrice = Number(product.price);
            if (!isNaN(min) && productPrice < min) return false;
            if (!isNaN(max) && productPrice > max) return false;
            return true;
        });
    }

    res.json({
        products: [...filteredProducts],
        total: filteredProducts.length,
        skip: 0,
        limit: 10

    });
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
