const Product = require("../../models/product");
const PropertyValueService = require("./property-value-service");

async function handleException(callback) {
  try {
    return callback();
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
}

async function getProducts(filter, fields, limit) {
  return handleException(async () => {
    if (limit) {
      return Product.find(filter, fields).limit(limit);
    } else {
      return Product.find(filter, fields);
    }
  });
}

async function getProductProperties(products) {
  const newProductsList = [];
  for (const product of products) {
    const newProduct = {
      _id: product._id,
      title: product.title,
      price: product.price,
      quantity: product.quantity,
      imageUrls: product.imageUrls,
      category: product.category,
      description: product.description,
      userID: product.userID,
      isActive: product.isActive
    }
    newProduct.properties = await PropertyValueService.getKeyValuePairsByID(product.properties);
    newProductsList.push(newProduct);
  }
  return newProductsList;
}

module.exports.postProduct = async productData => {
  const product = new Product(productData);
  return handleException(async () => {
    const result = await product.save();
    if (!result) {
      throw new Error("Oops! Something went wrong.")
    }
    return result;
  });
}
module.exports.getProduct = async (filter, populateProperties) => {
  return handleException(async () => {
    let product = await getProducts(filter);
    if (product.length > 0) {
      if (populateProperties) {
        product = await getProductProperties(product);
      }
      return product[0];
    }
  });
}

module.exports.getAllProducts = async (userID) => {
  return getProductProperties(await getProducts({userID: {$ne: userID}, isActive: true}));

}
module.exports.getAllProductsForLoggedInUser = async (userID, fields) => {
  const products = await getProducts({userID: userID, isActive: true}, fields);

  return products.map(product => {
    return {
      _id: product._id,
      title: product.title,
      price: product.price,
      imageUrl: product.imageUrls[0],
    }
  })
}

module.exports.updateProduct = async productData => {
  return handleException(async () => {
    let product = await Product.findById(productData._id);
    if (!product) null;
    product.title = productData.title;
    product.description = productData.description;
    product.price = productData.price;
    product.quantity = productData.quantity;
    product.category = productData.category;
    product.imageUrls = productData.imageUrls;
    product.properties = productData.properties;
    return product.save();
  });
}

module.exports.getProductOverviewDataByCategory = async (category, userID) => {
  return handleException(async () => {
    let products = await getProducts({
      category: category, userID: {$ne: userID},
      isActive: true
    }, "_id title price imageUrls", 4);
    return products.map(product => {
      return {
        _id: product._id,
        title: product.title,
        imageUrl: product.imageUrls[0],
        price: product.price,
      };
    });
  });

}
module.exports.deleteProduct = async (productID, userID) => {
  return handleException(async () => {
    const product = await Product.findById({_id: productID, userID: userID});
    if (product.isActive) {
      product.isActive = false;
      await product.save();

    }
    return true;
  })
}

module.exports.updateQuantity = async (productID, amountToBeDeducted) => {
  return handleException(async () => {
    const product = await Product.findById(productID);
    if (!product.isActive) return null;
    const newQuantity = product.quantity - amountToBeDeducted;
    if (newQuantity < 0) {
      throw new Error("Error! Product out of stock");
    }
    if (newQuantity === 0) {
      product.isActive = false;
    }
    product.quantity = newQuantity;
    return product.save();
  });
}


