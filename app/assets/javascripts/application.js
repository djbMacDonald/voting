// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

var $home;

function allowDrop(ev) {
  $('.drop').css('background-color', 'transparent');
  $('.drag').css('background-color', 'transparent');
  $('.blurb').css('background-color', 'transparent');
  $('a').css('background-color', 'transparent');
  $(ev.srcElement).css('background-color', 'springGreen');
  $(ev.srcElement.children).css('background-color', 'springGreen');
  if ($(ev.srcElement).attr('class') === 'drag') {
    $(ev.srcElement).parent().css('background-color', 'springGreen');
  }
  ev.preventDefault();
}

function drag(ev) {
  $(ev.target).children('.blurb').css('display', 'none');
  $(ev.target).children('a').text('+');
  ev.dataTransfer.setData("text", ev.target.id);
  $home = $(ev.path[1]);
}

function drop(ev) {
  ev.preventDefault();
  $('.drop').css('background-color', 'transparent');
  $('.drag').css('background-color', 'transparent');
  $('a').css('background-color', 'transparent');
  $('.blurb').css('background-color', 'transparent');
  var data = ev.dataTransfer.getData("text");
  if ($(ev.target).attr('class') === 'drop') {
    if (ev.target.children.length > 0) {
      $(ev.target.children[0]).appendTo($home);
    }
    ev.target.appendChild(document.getElementById(data));
  } else {
    $(ev.target).parent()[0].appendChild(document.getElementById(data));
    $(ev.target).appendTo($home);
  }
}

function toggleBlurb() {
  if ($(this).text() === '+') {
    $(this).text('-');
  } else {
    $(this).text('+');
  }
  $(this).siblings('.blurb').toggle('fast');
}


$(document).ready(function(){
  $('.blurbToggle').click(toggleBlurb);
});
