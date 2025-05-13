const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { marked } = require('marked');
const removeMarkdown = require('remove-markdown');
const languagetool = require('languagetool-api');
const fsSync = require('fs'); // for mkdirSync and unlinkSync

const notesDir = path.join(__dirname, '..', 'notes');

// Ensure the 'notes' directory exists
fsSync.mkdirSync(notesDir, { recursive: true });

/**
 * Save a Markdown string as a new note.
 */
async function saveMarkdownNote(markdownText) {
  const id = uuidv4();
  const filename = `${id}.md`;
  const filePath = path.join(notesDir, filename);

  await fs.writeFile(filePath, markdownText, 'utf-8');

  return {
    id,
    filename,
  };
}

/**
 * Save the uploaded Markdown file (.md) into the notes directory.
 */
async function saveUploadedMarkdownFile(file) {
  if (!file) {
    throw new Error('No file provided');
  }

  const markdownText = await fs.readFile(file.path, 'utf-8');

  // Save content as a new note
  const noteMeta = await saveMarkdownNote(markdownText);

  // Remove the uploaded file from temp uploads folder
  await fs.unlink(file.path);

  return noteMeta;
}

/**
 * Convert Markdown note to HTML.
 */
async function getRenderedNote(noteId) {
  const filename = `${noteId}.md`;
  const filePath = path.join(notesDir, filename);

  try {
    const markdown = await fs.readFile(filePath, 'utf-8');
    const html = marked(markdown);
    return { html };
  } catch (err) {
    throw new Error('Note not found or failed to render.');
  }
}

/**
 * Check grammar using LanguageTool on a Markdown string.
 */
async function checkGrammar(markdownText) {
  const plainText = removeMarkdown(markdownText);

  const options = {
    language: 'en-US',
    text: plainText
  };

  return new Promise((resolve, reject) => {
    languagetool.check(options, (err, result) => {
      if (err) return reject(err);
      resolve(result.matches); // list of grammar issues
    });
  });
}

module.exports = {
  saveMarkdownNote,
  saveUploadedMarkdownFile,
  getRenderedNote,
  checkGrammar
};
