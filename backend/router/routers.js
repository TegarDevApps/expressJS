const express = require('express')
const router = express.Router()

const usercontroller = require('../controller/users')
const categoryController = require('../controller/categoryController');
const upload = require('../middleware/upload');
const productController = require('../controller/productController');
const orderController = require('../controller/orderController');

//user router
router.get('/users', usercontroller.index)
router.get('/user/:id', usercontroller.show)
router.post('/user', usercontroller.store)
router.put('/user/:id', usercontroller.update)
router.delete('/user/:id', usercontroller.delete)

// Routes for Categories
router.get('/categories', categoryController.getCategories);
router.post('/categories', categoryController.createCategory);
router.put('/categories/:id', categoryController.updateCategory);
router.delete('/categories/:id', categoryController.deleteCategory);

// Routes for Products
router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProductById);
router.get('/products/category/:category_id', productController.getProductsByCategory);
router.post('/products', upload.single('image'), productController.createProduct);
router.put('/products/:id', upload.single('image'), productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

// Routes for Orders
router.get('/orders', orderController.getOrders);
router.get('/orders/:id', orderController.getOrderById);
router.post('/orders', orderController.createOrder);
router.put('/orders/:id', orderController.updateOrder);
router.delete('/orders/:id', orderController.deleteOrder);

module.exports = router