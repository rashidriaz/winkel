const PropertyService = require("../services/modal-service/property-service");
const PropertyValueService = require("../services/modal-service/property-value-service");

async function saveKey(key){
  let result = await PropertyService.postProperty(key);
    if (!result) {
      throw new Error("Something went wrong");
    }
  return result;
}

async function saveValue(value, propertyID){
  let result = await PropertyValueService.postValue(value, propertyID);
  if (!result){
    throw new Error("Something Went Wrong");
  }
  return result;
}

module.exports.postProperties = async(request, response, next)=> {
  const body = request.body;
  let count = 0;
  let valuesIDList = [];
  while (true) {
    const key = body['key' + count];
    if (!key) break;
    const value = body['value' + count];
    if (!value) {
      throw new Error("Key Value pair of property incomplete");
    }
    const keyResult = await saveKey(key);
    const valueResult = await saveValue(value, keyResult._id);
    valuesIDList.push(valueResult._id);
    count++;
  }
  request.properties = valuesIDList;
  next();
}
