const router = require('express').Router();
const { validPatchUser } = require('../validator/validator');
const { getUser, patchUser } = require('../controllers/users');
const auth = require('../middlewares/auth.js');

router.use(auth);
router.get('/me', getUser);
router.patch('/me', validPatchUser, patchUser);

module.exports = router;
