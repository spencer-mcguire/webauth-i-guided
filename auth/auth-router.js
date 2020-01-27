const router = require('express').Router();
const bc = require('bcryptjs');
const Users = require('../users/users-model.js');

router.post('/register', (req, res) => {
  let user = req.body;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user) {
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get('/secret', (req, res) => {
  if (req.headers.authorization) {
    // what im checking, how many times, callback
    bc.hash(req.headers.authorization, 10, (err, hash) => {
      res.status(200).json({ hash });
    });
  } else {
    res.status(400).json({ error: 'something' });
  }
});

module.exports = router;
