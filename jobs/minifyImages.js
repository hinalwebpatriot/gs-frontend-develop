const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminSvgo = require('imagemin-svgo');
const { lstatSync, readdirSync } = require('fs');
const { join, resolve } = require('path');

/**
 * @description
 * Script for compressing all our static images.
 * Currently, reads images from static/{images_sub_folder}
 * and outputs them into static/compressed/{images_sub_folder}
 *
 * ie. static/images  => static/compressed/static/images
 * ie. static/img     => static/compressed/static/img
 */

/**
 * Output directory
 * Where all the compressed images will go
 */
const OUTPUT_DIR = resolve(__dirname, "..", "src", "img_compress_2");

/**
 * List of input directories
 */
const INPUT_DIRS = [
  resolve(__dirname, "..", "src", "img")
  // 'static/images'
  // ADD NEW FOLDERS HERE
  // ...
];

const plugins = [
  imageminMozjpeg({
    quality: 85
  }),
  imageminPngquant({
    quality: [0.8, 0.95]
  }),
  imageminSvgo({
    floatPrecision: 2,
    plugins: [{ removeViewBox: false }]
  })
];


/**
 * Helper functions to get directories / sub-directories
 *
 * @see https://stackoverflow.com/a/40896897/4364074
 */
const isDirectory = source => lstatSync(source).isDirectory();
const getDirectories = source =>
  readdirSync(source)
    .map(name => join(source, name))
    .filter(isDirectory);
const getDirectoriesRecursive = source => [
  source,
  ...getDirectories(source)
    .map(getDirectoriesRecursive)
    .reduce((a, b) => a.concat(b), [])
];

try {
  console.log('Beginning image compression...');

  (async () => {
    let imageDirs = [];

    INPUT_DIRS.map(
      dirname =>
        (imageDirs = imageDirs.concat(getDirectoriesRecursive(dirname)))
    );

    /**
     * Loop through all subfolders, and recursively run imagemin,
     * outputting to the same subfolders inside OUTPUT_DIR folder
     */
    for (let i in imageDirs) {
      const dir = imageDirs[i];
      console.log(dir);
      await imagemin([`${dir}/*.{jpg,png,svg}`], {
        destination: join(OUTPUT_DIR, dir),
        plugins: plugins
      });
      console.log(`...${(((+i + 1) / imageDirs.length) * 100).toFixed(0)}%`);
    }

    console.log('Finished compressing all images!');
  })();
} catch (e) {
  console.log(e);
}
