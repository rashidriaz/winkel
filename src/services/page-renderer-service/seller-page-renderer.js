module.exports.renderAddNewProductPage = (request, response) => {
  return response.render("seller/edit-product", {
    documentTitle: "Add Product",
    product: {
      _id: "",
      title: "",
      imageUrls: [],
      price: "",
      quantity: "",
      description: "",
      properties: [],
      category: ""
    },
    action: "/seller/add-product",
    categories: request.categories,
  });
}

module.exports.renderMyProductsPage = (request, response) => {
  return response.render("seller/my-products", {
    documentTitle: "My Products",
    products: request.products
  });
}
module.exports.renderEditProductPage = (request, response) => {
  const product = request.product;
  return response.render("seller/edit-product", {
    documentTitle: "Edit Product",
    product: product,
    action: "/seller/edit-product",
    categories: request.categories,
  });
}
