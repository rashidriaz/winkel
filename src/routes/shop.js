const express = require("express");
const router = express.Router();
const ShopGetController = require("../controllers/get-controllers/shop");
const ShopPostController = require("../controllers/post-controllers/shop");
const CategoryHandler = require("../middlewares/category-handler");
const ProductHandler = require("../middlewares/product-handler");
const CartHandler = require("../middlewares/cart-handler");
const AuthHandler = require("../middlewares/auth");
const AddressHandler = require("../middlewares/address-handler");
const OrderHandler = require("../middlewares/order-handler");

router.get("/", CategoryHandler.getCategories, ProductHandler.fetchProductsByCategories, ShopGetController.getIndex);
router.get("/products", ProductHandler.fetchProducts, ShopGetController.getCategoryProductPage);
router.get("/products/:id", ProductHandler.fetchProduct, ShopGetController.getProductDetailsPage);
router.get("/cart", AuthHandler.isAuthenticated, CartHandler.getCartItems, ShopGetController.getCartPage);
router.get("/address-book", AuthHandler.isAuthenticated, AddressHandler.getAddresses, ShopGetController.getAddressBookPage)
router.get("/edit-address/:id", AuthHandler.isAuthenticated, AddressHandler.getEditAddress, ShopGetController.getEditAddressPage)
router.get("/add-address", AuthHandler.isAuthenticated, ShopGetController.getAddAddressPage)
router.get("/checkout", AuthHandler.isAuthenticated, CartHandler.getCartItems, CartHandler.checkEmptyCart,
  AddressHandler.getAddresses, AddressHandler.checkEmptyAddressBook, ShopGetController.getCheckoutPage);
router.get("/orders", AuthHandler.isAuthenticated, OrderHandler.getOrders, ShopGetController.getOrdersPage)


router.post("/add-to-cart", AuthHandler.isAuthenticated, ShopPostController.postCartItem);
router.post("/delete-cart-item", AuthHandler.isAuthenticated, ShopPostController.postDeleteCartItem);
router.post("/delete-product", AuthHandler.isAuthenticated, ShopPostController.postDeleteProduct);
router.post("/add-new-address", AuthHandler.isAuthenticated, AddressHandler.saveNewAddress,
  AddressHandler.getAddresses, ShopGetController.getAddressBookPage)
router.post("/edit-address", AuthHandler.isAuthenticated, AddressHandler.editAddress,
  AddressHandler.getAddresses, ShopGetController.getAddressBookPage)
router.post("/delete-address", AuthHandler.isAuthenticated, AddressHandler.getEditAddress,
  ShopPostController.deleteAddress);
router.post("/post-order", AuthHandler.isAuthenticated, AddressHandler.getEditAddress,
  CartHandler.getCartItems, ShopPostController.placeOrder);
module.exports = router;



