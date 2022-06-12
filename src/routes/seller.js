const express = require("express");
const router = express.Router();
const sellerGetController = require("../controllers/get-controllers/seller");
const sellerPostController = require("../controllers/post-controllers/seller");
const authHandler = require("../middlewares/auth");
const ProductHandler = require("../middlewares/product-handler");
const CategoryHandler = require("../middlewares/category-handler");
const PropertyHandler = require("../middlewares/property-handler")
const ImageHandler = require("../middlewares/product-image-handler");

router.get("/add-product", authHandler.isAuthenticated, CategoryHandler.getCategories, sellerGetController.getAddProduct);
router.get("/my-products", authHandler.isAuthenticated, ProductHandler.fetchUserProducts, sellerGetController.getMyProducts);
router.get("/edit-product/:id",
  authHandler.isAuthenticated,
  CategoryHandler.getCategories,
  ProductHandler.fetchEditProduct,
  sellerGetController.getEditProduct);


router.post("/add-product", authHandler.isAuthenticated, CategoryHandler.postCategory, PropertyHandler.postProperties,
  ImageHandler.getNewProductImageUrls, sellerPostController.postAddProduct);

router.post("/edit-product", authHandler.isAuthenticated, CategoryHandler.postCategory, PropertyHandler.postProperties,
  ProductHandler.fetchEditProduct, ImageHandler.deleteOldImages, ImageHandler.getNewProductImageUrls,
  sellerPostController.postEditProduct);


module.exports = router;


