const {response} = require("express");


module.exports.renderShopHomePage = (request, response) => {
  return response.render("shop/index", {
    documentTitle: "Shop - Home",
    categories: request.categories,
    oldInput: {
      search: "",
    },
    productsByCategories: request.productsByCategories
  });
}
module.exports.renderCategoryPage = (request, response) => {
  const category = request.query.category;
  const products = request.products;
  return response.render("shop/category-page", {
    documentTitle: category,
    category: category,
    products: products
  });
}
module.exports.renderProductDetailsPage = (request, response) => {
  const product = request.product;
  if (!product) {
    return response.redirect("/");
  }
  response.render("shop/product-details-page", {
    product: product,
    documentTitle: product.title,
  })
}

module.exports.renderCartPage = (request, response) => {
  const cart = request.cart;
  response.render("shop/cart", {
    documentTitle: "My Cart",
    cart: cart,
  })
}

module.exports.renderAddressBookPage = (request, response) => {
  const {addressBook} = request;
  response.render("shop/address-book", {
    documentTitle: "Address Book",
    addressBook: addressBook,
  });
}

module.exports.renderAddAddressPage = (request, response) => {
  response.render("shop/edit-address", {
    documentTitle: "Add new Address",
    oldInput: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    action: "/add-new-address"
  });
}
module.exports.renderEditAddressPage = (request, response) => {
  response.render("shop/edit-address", {
    documentTitle: "Edit Address",
    oldInput: request.address,
    action: "/edit-address"
  });
}

module.exports.renderCheckoutPage = (request, response) => {
  const {addressBook, cart} = request;
  response.render("shop/checkout", {
    documentTitle: "Checkout",
    addressBook: addressBook,
    cart: cart
  });
}

module.exports.renderOrdersPage = (request, response)=>{
  const {orders} = request;
  response.render("shop/orders", {
    documentTitle: "My Orders",
    orders: orders
  })
}
