const PNGJS = require('pngjs');
const fs = require('fs');

fs.createReadStream('test.png')
  .pipe(
    new PNGJS.PNG({
      filterType: 4,
    })
  )
  .on('parsed', function () {
    // @ts-ignore
    const png: PNG = this;
    const { width, height, data, pack } = png;
    for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {
        // if (y <= 5 && x <= 5) {
          var idx = (width * y + x) << 2;
          data[idx + 8] = 255
          // data[idx] = 0
        // }
      }
    }

    // data[0] = 255
    // data[1] = 0
    // data[2] = 0
    // data[3] = 70
    // @ts-ignore
    this.pack().pipe(fs.createWriteStream('out.png'));
  });
