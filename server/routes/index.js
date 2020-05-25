const { Router } = require('express');
const controllers = require('../controllers')
const router = Router();

router.get('/', (req, res) => res.send('This is rooot!'))

router.post('/register', controllers.register);
router.post('/login', controllers.login);
router.post('/portfolio', controllers.viewPortfolio);
router.post('/transactions/new', controllers.newTransaction);
router.post('/transactions', controllers.viewTransactions);

module.exports = router;