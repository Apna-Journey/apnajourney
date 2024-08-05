const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, generateDocument } = require('../controllers/profileController');

router.get('/:id', getProfile);
router.put('/:id', updateProfile);
router.post('/:id/generate-document', generateDocument);

module.exports = router;
