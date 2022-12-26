const { readdirSync, writeFile } = require('fs');

writeFile('src/project-loaded-images.json', JSON.stringify(readdirSync('./public/icons', (data: any) => data)), () =>
  console.log('generated files list')
);
