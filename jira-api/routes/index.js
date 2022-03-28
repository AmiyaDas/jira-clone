var express = require('express');
var router = express.Router();
let fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/users', (req, res) => {
  try {
    let json;
    fs.readFile('./data/user.json', function (err, data) {
      if (err) {
        console.log(err);
      }
      json = JSON.parse(data);
      // console.log('JSON in callback', json);
      res.status(200).send(json);
    });
  }
  catch(err) {
    console.log(err);
    res.status(500).send({"error": "Internal Server Error"});
  }
});

router.post('/addUser', (req, res) => {
  try {
    let incomingData = req.body;
    let user = {};
    user.id = incomingData.id;
    user.name = incomingData.name;
    user.email = incomingData.email;
    user.role = incomingData.role;
    fs.readFile('./data/user.json', function (err, data) {
        var json = JSON.parse(data);
        console.log(json, JSON.user);
        json.push(user);
        fs.writeFile('./data/user.json', JSON.stringify(json), 'utf8', (err,data) => {
          console.log('done');
        });
        res.status(200).send({"success":true});
    })
  }
  catch(err) {
    console.log(err);
    res.status(500).send({"error": "Internal Server Error"});
  }
});

module.exports = router;
