# 📝 Markdown Notes API

A simple Express.js REST API to save, render, and grammar-check Markdown notes. Also supports uploading `.md` files via multipart form-data using `multer`.

---

## 🚀 Features

- Save markdown text directly via JSON.
- Upload `.md` files.
- Render markdown content to HTML.
- Check grammar using LanguageTool API.

---

## 📁 Core Project Structure

markdown-note-app/
src/
├── controllers/ # Route handlers (business logic)
├── middleware/ # Multer config for file uploads
├── notes/ # Saved markdown files
├── routes/ # API route definitions
├── services/ # Core logic for file ops, grammar, rendering
├── uploads/ # Temporary storage for uploaded files
├── app.js / server.js # Express app entry point


---

## 📦 Install & Run

```bash
# Clone repo
git clone  https://github.com/Tesfamariam777/markdown-note-app.git
cd markdown-notes-api

# Install dependencies
npm install

# Start the server
npm run dev

Make sure uploads/ and notes/ directories are writable. They are auto-created if missing.

##🔌 API Endpoints
POST /creat
Function: Save a new note from raw Markdown text sent in the request body.

POST /upload
Function: Upload a .md file using multipart/form-data. The file is parsed, saved as a note, and the temporary file is deleted.

GET /render/:id
Function: Render a saved Markdown note (identified by its ID) to HTML and return it as a JSON response.

POST /grammar
Function: Analyze Markdown content for grammar and spelling mistakes using the LanguageTool API. Returns a list of issues found.



## ⚙️ Tech Stack
Node.js + Express

Multer – file upload middleware

Marked – Markdown to HTML parser

LanguageTool API – Grammar check

UUID – unique IDs for notes


