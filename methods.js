const methods = {};

methods.addHandler = (req, res) => {
  const body = req.body;
  
  //check if userId (body.userId) is in DB
  
  //check if duration is a number
  
  //check if date is valid. No data means today. 
  return res.json(body);
}

module.exports = methods;