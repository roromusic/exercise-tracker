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
  let id = Number(body.userId),
      duration = body.duration,
      description = body.description,
      date;
  
  //check if userId (body.userId) is in DB
  collection.findOne({id: id}, (err, data) => {
    if (err) throw err;
    if(!data) {
      return res.end("unknown id");
    }
    //check if duration is a number
    if(!Number(duration)) {
      return res.end("Duration input must be a number");
    }
    //convert date to proper format
    if(!body.date) {
      date = chrono.parseDate('today').toString().slice(0, 15);
    }else{
      if(chrono.parseDate(body.date)) {
        date = chrono.parseDate(body.date).toString().slice(0, 15);
      }else {
        return res.end('Invalid date');
      }
    }
    let log = data.log;
    let obj = {
      username: data.username,
      id: data.id,
      description: description,
      duration: duration,
      date: date
    }
    
    log.unshift({
      description: description,
      duration: duration,
      date: date
    });
    
    collection.update({
      id: id
    }, {
      $set: {
        log: log
      }
    }, (err, data) => {
      if(err) throw err;
      res.json(obj);
    })
  })
  
  
  //check if date is valid. No data means today. 
  //return res.json(body);
}

methods.getLog = (req, res, collection) => {
  let userId = req.query.userId;
  let from = req.query.from;
  let to = req.query.to;
  let limit = req.query.limit;
  
  res.end(userId + " " + from + " " + to + " " + limit);
}
module.exports = methods;