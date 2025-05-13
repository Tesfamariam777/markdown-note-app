const noteService = require('../services/noteService');

const saveNote = async (req, res) => {
  const { markdown } = req.body;

  if (!markdown) {
    return res.status(400).json({ error: 'Markdown text is required' });
  }

  try {
    const result = await noteService.saveMarkdownNote(markdown);
    res.status(201).json({
      message: 'Markdown note saved successfully',
      noteId: result.id,
      filename: result.filename
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save note' });
  }
};
const renderNote = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await noteService.getRenderedNote(id);
    res.status(200).json({ html: result.html });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
const grammarCheck = async (req, res) => {
  const { markdown } = req.body;
  if (!markdown) return res.status(400).json({ error: 'Markdown text is required' });

  try {
    const issues = await noteService.checkGrammar(markdown);
    res.status(200).json({ issues });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Grammar check failed' });
  }
};
async function uploadMarkdownFile(req, res) {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });

    const result = await noteService.saveUploadedMarkdownFile(file);
    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}


module.exports = {
  saveNote,
  renderNote,
  grammarCheck,
  uploadMarkdownFile
};
