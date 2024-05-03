const { getAll, create, remove } = require('../controllers/product.controllers');
const express = require('express');

const routerProduct = express.Router();

routerProduct.route('/')
    .get(getAll)
    .post(create);

routerProduct.route('/:id')
    .delete(remove)


module.exports = routerProduct;

