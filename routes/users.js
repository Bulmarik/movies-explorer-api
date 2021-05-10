const router = require('express').Router();
const { validPatchUser } = require('../validator/validator');
const { getUser, patchUser } = require('../controllers/users');

router.get('/me', getUser);
router.patch('/me', validPatchUser, patchUser);

module.exports = router;