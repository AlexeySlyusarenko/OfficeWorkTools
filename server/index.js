'use strict';

const path = require('node:path');
const fs = require('node:fs').promises;
const http = require('node:http');
const PORT = 8080;
const MIME_TYPES = {
  default: 'application/octet-stream',
  html: 'text/html; charset=UTF-8',
  js: 'application/javascript; charset=UTF-8',
  css: 'text/css',
  ico: 'image/x-icon',
};

http
  .createServer(async (req, res) => {
    const pathName = path.join(
      process.cwd(),
      'client',
      'src',
      `pages${req.url}`
    );
    try {
      console.log(`${req.method} ${req.url}`);
      const data = await fs.readFile(pathName, 'utf8');
      const ext = path.extname(req.url).substring(1).toLowerCase();
      const mimeType = MIME_TYPES[ext] || MIME_TYPES.html;
      const statusCode = data ? 200 : 404;
      res.writeHead(statusCode, { 'Content-Type': mimeType });
      res.end(data);
    } catch {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
      res.end();
    }
  })
  .listen(PORT, () => {
    console.log(`Server start on port ${PORT}`);
  });
