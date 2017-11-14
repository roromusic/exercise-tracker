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
      let results = new chrono.parse('today');
      date = results[0].start.date();
    }else{
      if(chrono.parseDate(body.date)) {
        let results = new chrono.parse(body.date);
        date = results[0].start.date();
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
      date: date.toString().slice(0, 15)
    }
    
    log.unshift({
      description: description,
      duration: duration,
      dateObj: date,
      date: date.toString().slice(0, 15)
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
  let userId = Number(req.query.userId),
      limit = req.query.limit,
      from = undefined,
      to = undefined;
  
  let toResults = new chrono.parse(req.query.to);
  let fromResults = new chrono.parse(req.query.from);
  
  if (toResults.length > 0) to = toResults[0].start.date();
  if (fromResults.length > 0) from = fromResults[0].start.date();
  
  collection.findOne({id: userId}, (err, data) => {
    if (err) throw err;
    let obj = {
      id: data.id,
      username: data.username,
      count: data.log.length,
      log: data.log.sort((a,b) => {
        return b.dateObj - a.dateObj;
      }).map(obj => {
        return {
          description: obj.description,
          duration: obj.duration,
          date: obj.date
        }
      })
    }
    res.json(obj);
  })
}
module.exports = methods;