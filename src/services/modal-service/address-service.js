const Address = require("../../models/address");
const {add} = require("nodemon/lib/rules");

async function handleException(callback) {
  try {
    return callback();
  } catch (error) {
    console.log("Error in address service");
    console.log(error);
  }
}


module.exports.addAddress = async (data) => {
  const newAddress = new Address({
    user: data.userID,
    street: data.street,
    apartment: data.apartment,
    city: data.city,
    state: data.state,
    country: data.country,
    zipCode: data.zipCode,
  });
  return handleException(async () => {
    const address = await newAddress.save();
    return {
      _id: address._id,
      street: address.street,
      apartment: address.apartment,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country
    };;
  });
}
module.exports.getAddress = async(id) => {
  return handleException(async() => {
    const address = await Address.findById(id);
    if (!address)return null;
    return {
      userID: address.user,
      _id: address._id,
      street: address.street,
      apartment: address.apartment,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country
    };
  });
}
module.exports.getAllAddresses = async(userID) => {
  return handleException(async() => {
    const addresses = await Address.find({user: userID});
    return addresses.map(address=>{
      return {
        _id: address._id,
        street: address.street,
        apartment: address.apartment,
        city: address.city,
        state: address.state,
        zipCode: address.zipCode,
        country: address.country
      };
    });
  })
}
module.exports.updateAddress = async (data) => {
  return handleException(async () => {
    const address = await Address.findById(data.addressID);
    if (!address) return null;
    address.street = data.street;
    address.apartment = data.apartment;
    address.city = data.city;
    address.state = data.state;
    address.country = data.country;
    address.zipCode = data.zipCode;
    return address.save();
  });
}
module.exports.deleteAddress = async (addressID) => {
  return handleException(async () => {
    return Address.findByIdAndRemove(addressID);
  });
}
