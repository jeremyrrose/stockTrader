const { Router } = require('express');
const controllers = require('../controllers')
const router = Router();

router.get('/', (req, res) => res.send('This is rooot!'))

router.post('/register', controllers.register);
router.post('/login', controllers.login);
router.get('/account', controllers.account);
router.get('/portfolio', controllers.viewPortfolio);
router.post('/transactions/new', controllers.newTransaction);
router.get('/transactions', controllers.viewTransactions);

module.exports = router;