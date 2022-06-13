const Property = require("../../models/property");

async function handleException(callback) {
  try {
    return callback();
  } catch (error) {
    return null;
  }
}

module.exports.postProperty = async (title) => {
  title = title.toLowerCase();
  return handleException(async () => {
    let property = await Property.findOne({title: title});
    if (!property) {
      property = new Property({title: title});
      await property.save();
    }
    return property;
  });

}

module.exports.getProperty = async (id) => {
  return handleException(async () => {
    return Property.findById(id);
  });
}
