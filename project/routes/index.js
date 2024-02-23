const express = require('express');
const User = require('../schemas/user');

const router = express.Router();
app.post('./routes/users', (req, res) => {
  const user = new User
})

router.get('/', async (req, res, next) => {
  try {
    const users = await User.find({});
    res.render('login' ,{users} );
  } catch (err) {
    console.error(err);
    next(err);
  }
});


module.exports = router;