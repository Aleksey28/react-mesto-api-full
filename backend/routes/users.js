const router = require('express').Router();
const {
  getUsers,
  getUser,
  getUserInfo,
  createUser,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

// TODO add validation for routes
router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.get('/users/me', getUserInfo);
router.post('/users', createUser);
router.patch('/users/me', updateUserInfo);
router.patch('/users/me/avatar', updateUserAvatar);

module.exports = router;
