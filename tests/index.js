var expect = require('expect.js'),
    sinon = require('sinon'),
    $ = require('jquery');

  require('./index.css');

var files = ['util','canvas','labels','axis','auto','tooltip','line','area','column','pie','radar','series-group','dynamic'];

var node = $('<div class="content"><ul class="menu"></ul></div>').appendTo('body'),
  iframe = $('<iframe class="doc-frame" frameborder="0"></iframe>').appendTo(node);
  menuEl = node.find('.menu');

$.each(files,function  (index,file) {
  var str = '<li><a href="h-'+file+'.html">'+file+'</a></li>';
  $(str).appendTo(menuEl);
});

open('h-' + files[0] + '.html');

$('.menu a').on('click',function(ev){
  var 
    link =  $(ev.target),
    href = link.attr('href');

  ev.preventDefault();
  open(href);
});

function open(href){
  iframe.attr('src',href);
}