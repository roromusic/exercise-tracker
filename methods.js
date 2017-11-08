const methods = {};

methods.newUserHandler = (req, res, collection) => {
  const body = req.body;
  
  collection.findOne({username: body.username}, (err, data) => {
    if (err) throw err;
    if(!data) {
      let obj = {
        username: body.username
      };
      
      collection.count({}, (err, data) => {
        if (err) throw err;
        obj.id = data + 1;
        
        collection.insert(Object.assign({log: []}, obj), (err, data) => {
          if (err) throw err;
          return res.json(obj);
        })
      })
    }else {
      return res.end('username already taken');
    }
  })
}

methods.getUsers = (req, res, collection) => {
  collection.find({}, {
    username: 1, id: 1, log: 0
  } (err, data) => {
    if (err) throw err;
    console.log(data.toArray());
    return res.end();
  })
}

methods.addHandler = (req, res, collection) => {
  const body = req.body;
  
  //check if userId (body.userId) is in DB
  collection.findOne({id: body.id}, (err, data) => {
    if (err) throw err;
  })
  //check if duration is a number
  
  //check if date is valid. No data means today. 
  return res.json(body);
}

module.exports = methods;