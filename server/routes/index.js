const { Router } = require('express');
const controllers = require('../controllers')
const router = Router();

router.get('/', (req, res) => res.send('This is rooot!'))

router.post('/register', controllers.register);
router.post('/login', controllers.login);
router.post('/transaction', controllers.newTransaction);

module.exports = router;