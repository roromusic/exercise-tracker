const chrono = require('chrono-node');

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
    username: 1, 
    id: 1,
    _id: 0
  }).toArray((err, data) => {
    if(err) throw err;
    res.json(data);
  })
}

methods.addHandler = (req, res, collection) => {
  const body = req.body;
  
  //check if userId (body.userId) is in DB
  collection.findOne({id: Number(body.userId)}, (err, data) => {
    if (err) throw err;
    if(!data) {
      return res.end("unknown id");
    }
    //check if duration is a number
    if(!Number(body.duration)) {
      return res.end("Duration input must be a number");
    }
    return res.end(chrono.parseDate(body.date).toString());
  })
  
  
  //check if date is valid. No data means today. 
  //return res.json(body);
}

module.exports = methods;