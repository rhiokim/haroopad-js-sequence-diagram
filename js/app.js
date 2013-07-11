var marked = require('marked');

var gui = require('nw.gui'),
    win = gui.Window.get();

var opt = {
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: true,
  silent: false,
  langPrefix: ''
};

marked.setOptions(opt);

var renderer = new marked.Renderer();

var parse = function(src, options) {
  options = options || opt;
  return marked.parser(marked.lexer(src, options), options, renderer);
}

window.onload = function() {
	win.on('update', function(md) {
		
	});
}