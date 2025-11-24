const router = require('express').Router();
const ctrl = require('../controllers/category.controller');
const auth = require('../middleware/auth');

router.get('/', ctrl.list);
router.post('/', auth, ctrl.create);

module.exports = router;
