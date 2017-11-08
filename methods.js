const methods = {};

methods.newUserHandler = (req, res, collection) => {
  collection.findOne({}, (err, data) => {
    if (err) throw err;
    if(!data) {
      return res.json({"error": "No such user"})
    }
  })
}

methods.addHandler = (req, res, collection) => {
  const body = req.body;
  
  //check if userId (body.userId) is in DB
  collection.findOne({}, (err, data) => {
    if (err) throw err;
    if(!data) {
      return res.json({"error": "No such user"})
    }
  })
  //check if duration is a number
  
  //check if date is valid. No data means today. 
  return res.json(body);
}

module.exports = methods;