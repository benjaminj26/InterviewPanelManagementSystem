const express = require('express');
const router = express.Router();
const panelController = require('../controllers/panel.controller');

router.post('/', panelController.createPanel);
router.get('/', panelController.getAllPanels);
router.get('/:id', panelController.getPanelById);
router.put('/:id', panelController.updatePanel);
router.delete('/:id', panelController.deletePanel);

module.exports = router;

