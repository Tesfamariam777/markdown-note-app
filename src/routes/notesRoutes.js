const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');
const upload = require('../middleware/upload');

router.post('/creat', notesController.saveNote);

router.get('/render/:id', notesController.renderNote);

router.post('/grammar', notesController.grammarCheck);

router.post('/upload', upload.single('file'), notesController.uploadMarkdownFile);

module.exports = router;
