import resolve from 'rollup-plugin-node-resolve';
import copy from 'rollup-plugin-copy';

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    sourceMap: 'inline'
  },
  name: 'MyModule',
  plugins: [
    resolve(),
    copy({
      targets: [
        { src: 'index.html', dest: 'dist' },
        { src: 'favicon.ico', dest: 'dist' },
        { src: 'style.css', dest: 'dist' },
        { src: 'node_modules/bulma/css/bulma.css', dest: 'dist/bulma'},
        { src: 'node_modules/@fortawesome/fontawesome-free/css/all.css', dest: 'dist/fontawesome'},
        { src: 'node_modules/@fortawesome/fontawesome-free/webfonts', dest: 'dist'}
      ]
    })
  ]
};