var gui = require('nw.gui'),
win = gui.Window.get();

var mdconf = require('./views/sequence-diagram/js/node_modules/mdconf');

function log(obj) {
  console.log(JSON.stringify(obj, null, 2));
}

function parseSyntax(md) {
/*
# title

- Andrew->China: Says Hello
- Note right of China: China thinks\nabout it
- China-->Andrew: How are you?
- Andrew->>China: I am good thanks!
 */

}

function clear() {
  document.getElementById('diagram').innerHTML = '';
}

window.onload = function() {
  var raw, res;

  win.on('update', function(md) {
  	raw = mdconf(md);
  	res = '';

  	clear();

  	_.each(raw, function(item, title) {
  	  res += 'Title: '+ title +'\n';

  	  _.each(item, function(desc, syntax) {
  	  	res += syntax +': '+ desc +'\n';
  	  });
  	});

	var diagram = Diagram.parse(res);
	diagram.drawSVG("diagram", { theme: 'hand' });
  });
}