const express = require("express");
const router = express.Router();
const shopGetController = require("../controllers/get-controllers/shop");
const shopPostController = require("../controllers/post-controllers/shop");
const CategoryHandler = require("../middlewares/category-handler");
const ProductHandler = require("../middlewares/product-handler");


router.get("/", CategoryHandler.getCategories, ProductHandler.fetchProductsByCategories, shopGetController.getIndex);
router.get("/products", ProductHandler.fetchProducts, shopGetController.getCategoryProductPage);
router.get("/products/:id", ProductHandler.fetchProduct, shopGetController.getProductDetailsPage);

module.exports = router;


