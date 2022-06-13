const PropertyValue = require("../../models/property-value");


async function handleException(callback){
  try{
    return callback();
  }catch (error){
    return null;
  }
}
module.exports.postValue = async(title, propertyID)=>{
  title = title.toLowerCase();
  return handleException(async()=>{
    let property = await PropertyValue.findOne({title: title, propertyID:propertyID});
    if (!property){
      property = new PropertyValue({title: title, propertyID: propertyID});
      await property.save();
    }
    return property;
  });

}

module.exports.getValue = async(id)=>{
  return handleException(async()=>{
    return PropertyValue.findById(id);
  });
}

module.exports.getValuesByPropertyID = async(id)=>{
  return handleException(async()=>{
      let properties = await PropertyValue.find({propertyID: id});
      if (properties){
        properties = properties.map(property=>property.title);
      }
      return properties;
  });
}
module.exports.getKeyValueByID = async(id)=>{
  return handleException(async()=>{
    let propertyValue = await PropertyValue.findById(id).populate('propertyID');
    if (!propertyValue)return null;
    return {key: propertyValue.propertyID.title, value: propertyValue.title};
  })
}

module.exports.getKeyValuePairsByID = async(ids)=>{
  return handleException(async()=>{
    let propertiesList = await PropertyValue.find({'_id': {$in: ids}}).populate("propertyID");
    if (!propertiesList)return null;
    return propertiesList.map(propertyValue=> {
      return {
        key: propertyValue.propertyID.title,
        value: propertyValue.title
      }
    });
  })
}
