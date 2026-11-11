
const express = require('express');
const router = express.Router();

const jurnalController = require('../controllers/jurnalController');
const cekApiKey = require('../middlewares/cekApiKey');

router.get('/', jurnalController.getAll);
router.get('/:id', jurnalController.getById);
router.post('/', cekApiKey, jurnalController.create);

module.exports = router;
