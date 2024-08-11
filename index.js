// index.js
import html from './index.html'; // assuming you're using a bundler like Webpack

function render(filePath) {
  // Use the imported HTML string instead of reading it from a file
  const htmlString = html;

  // Get the filename without the directory or extension
  const fileName = filePath.split('/').pop().split('.')[0];

  // Import the associated JavaScript code
  let jsCode = '';
  if (module.parent && module.parent.children && module.parent.children.length > 0) {
    const jsPath = `./js/${fileName}.js`;
    const jsModule = require(jsPath);
    jsCode = `<script>${jsModule.default}</script>`;
  }

  // Return the rendered HTML
  return htmlString.replace('</head>', `${jsCode}</head>`);
}

module.exports = render;