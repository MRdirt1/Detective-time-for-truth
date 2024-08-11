// index.js
const fs = require('fs');
const path = require('path');

// Define a function that renders an HTML file with its associated JavaScript code
function render(filePath) {
  // Read the HTML file
  const html = fs.readFileSync(filePath, 'utf8');

  // Get the filename without the directory or extension
  const fileName = path.basename(filePath, '.html');

  // Import the associated JavaScript code
  const jsPath = `./js/${fileName}.js`;
  let jsCode = '';
  if (fs.existsSync(jsPath)) {
    jsCode = `<script src="${jsPath}"></script>`;
  }

  // Return the rendered HTML
  return html.replace('</head>', `${jsCode}</head>`);
}

// Export the render function
module.exports = render;