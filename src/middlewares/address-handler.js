const AddressService = require("../services/modal-service/address-service");

module.exports.getAddresses = async (request, response, next) => {
  let addresses = await AddressService.getAllAddresses(request.session.userID);
  if (!addresses) {
    request.addressBook = [];
  }
  request.addressBook = addresses;
  next();
}
module.exports.checkEmptyAddressBook = (request, response, next)=>{
  const {addressBook} = request;
  if (addressBook.length === 0){
    return response.redirect("/address-book");
  }
  return next();
}
module.exports.saveNewAddress = async (request, response, next) => {
  let {street, apartment, city, state, country, zipCode} = request.body;
  await AddressService.addAddress({
    userID: request.session.userID,
    street: street,
    apartment: apartment,
    city: city,
    state: state,
    country: country,
    zipCode: zipCode,
  });
  next();
}
module.exports.editAddress = async (request, response, next) => {
  let {street, apartment, city, state, country, zipCode, id} = request.body;
  await AddressService.updateAddress({
    addressID: id,
    userID: request.session.userID,
    street: street,
    apartment: apartment,
    city: city,
    state: state,
    country: country,
    zipCode: zipCode,
  });
  next();
}
module.exports.getEditAddress = async (request, response, next) => {
  const id = request.params.id?request.params.id: request.body.addressID;
  request.address = await AddressService.getAddress(id);
  next();
}
