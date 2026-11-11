
const express = require('express');
const router = express.Router();

const artikelController = require('../controllers/artikelController');
const cekApiKey = require('../middlewares/cekApiKey');

router.get('/', artikelController.getAll);
router.get('/:id', artikelController.getById);
router.post('/', cekApiKey, artikelController.create);
router.put('/:id', cekApiKey, artikelController.update);
router.delete('/:id', cekApiKey, artikelController.remove);

module.exports = router;
