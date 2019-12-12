import join from 'lodash/join';
const tmplContents = require('./index.html');
require('./index.scss');

const test = join(['Hello', 'webpack'], ' ');
console.log(test);
console.log(tmplContents);

const $tmpl = document.createElement("div");
$tmpl.innerHTML = tmplContents;
document.body.appendChild($tmpl);