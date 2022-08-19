const router = require('express').Router();
const userCtrl = require('../controllers/employeeCtrl');
const auth = require('../middleware/auth');

router.post('/register', userCtrl.register);

router.post('/login', userCtrl.login);

router.post('/refresh_token', userCtrl.getAccessToken);

router.get('/infor', auth, userCtrl.getUserInfor);

router.patch('/userallthings', auth, userCtrl.updateAllDetails);

router.post('/uploadbook', auth, userCtrl.uploadBook);
router.get('/getAllBooks', auth, userCtrl.getAllBooks);
router.get('/book/:id', auth, userCtrl.getBook);
router.put('/edit/:id', auth, userCtrl.updatebook);
router.get('/delete/:id', auth, userCtrl.deleteBook);

// Social Login

module.exports = router;
