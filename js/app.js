var gui = require('nw.gui'),
win = gui.Window.get();

var mdconf = require('./views/sequence-diagram/js/node_modules/mdconf');
var raw, res, drawTimeout;

function delayUpdate(md) {
	raw = mdconf(md);
	res = '';

	clear();

	_.each(raw, function(item, title) {
	  res += 'Title: '+ title +'\n';

	  _.each(item, function(desc, syntax) {
	  	res += syntax +': '+ desc +'\n';
	  });
	});

	try {
		var diagram = Diagram.parse(res);
		// log(diagram);
		diagram.drawSVG("diagram", { theme: 'hand' });
	} catch(e) {
		
	}
}

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
  $('#diagram').html('');
}

function getSVGHtml() {
	var svg = $('#diagram').find('svg')[0];
	var width = parseInt(svg.width.baseVal.value);
	var height = parseInt(svg.height.baseVal.value);

	str = svg.innerHTML;
	str = str.replace('#raphael-marker-block" transform="rotate(180 2.5 2.5) scale(1,1)"', '#raphael-marker-block" transform="rotate(180 2.5 2.5) scale(1,1) translate(2,2.4)"')
	str = str.replace('#raphael-marker-open" transform="rotate(180 3.5 3.5) scale(1,1)"', '#raphael-marker-open" transform="rotate(180 3.5 3.5) scale(1,1) translate(5, 3.5)"')
	str = str.replace(/'Andale Mono',/g, "");
	str = '<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height + '" xmlns:xlink="http://www.w3.org/1999/xlink">' + str + '</svg>';
	return str;
}

function preProcess() {
	//translate(2,2.4)
	// translate(5, 3.5)
}

window.onload = function() {

  win.on('update', function(md) {
  	window.clearTimeout(drawTimeout);

  	drawTimeout = window.setTimeout(function(){
  		delayUpdate(md);
  	}, 700);
  });

	$('#download').click(function(ev) {
		var xml = '<?xml version="1.0" encoding="utf-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">'+ getSVGHtml();

		var a = $(this);
		a.attr("download", "diagram.svg"); // TODO I could put title here
		a.attr("href", "data:image/svg+xml," + encodeURIComponent(xml));
	});

	$('#canvg').click(function(e) {
		canvg('canvas', getSVGHtml());
		var canvas = document.getElementById('canvas');
		$('#png').attr('href', canvas.toDataURL('image/png'));
	});

	// $('#png').click(function(e) {
	// 	canvas = document.getElementById('canvas');
	// 	console.log();
	// });
}