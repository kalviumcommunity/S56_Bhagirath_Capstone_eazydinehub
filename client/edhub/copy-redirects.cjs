const fs = require('fs-extra');

fs.copy('_redirects', 'dist/_redirects')
  .then(() => console.log('Redirects copied successfully'))
  .catch(err => console.error('Error copying redirects:', err));
