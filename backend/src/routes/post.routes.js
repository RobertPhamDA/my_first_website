const express = require('express');
const ctrl = require('../controllers/post.controller');
const auth = require('../middleware/auth');

module.exports = (upload) => {
  const router = express.Router();

  router.get('/', ctrl.list);
  router.get('/:id', ctrl.detail);
  router.post('/', auth, upload.single('image'), ctrl.create);

  return router;
};
