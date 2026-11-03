const express = require('express');
const router = express.Router();

const orangTuaController = require('../controllers/OrangTuaController');
const cekApiKey = require('../middlewares/cekApiKey');

router.get('/', orangTuaController.getAll);
router.post('/', cekApiKey, orangTuaController.create);

module.exports = router;