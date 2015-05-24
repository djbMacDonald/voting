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
  $('.blurb').css('background-color', 'white');
  $('.blurbToggle').css('background-color', 'transparent');
  $(ev.srcElement).css('background-color', 'springGreen');
  $(ev.srcElement.children).css('background-color', 'springGreen');
  if ($(ev.srcElement).attr('class') === 'drag') {
    $(ev.srcElement).parent().css('background-color', 'springGreen');
  }
  ev.preventDefault();
}

function drag(ev) {
  $('.blurb').css('display', 'none');
  $('.blurbToggle').text('+');
  ev.dataTransfer.setData("text", ev.target.id);
  $home = $(ev.path[1]);
}

function drop(ev) {
  ev.preventDefault();
  $('.drop').css('background-color', 'transparent');
  $('.drag').css('background-color', 'transparent');
  $('.blurbToggle').css('background-color', 'transparent');
  $('.blurb').css('background-color', 'white');
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

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId());
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail());
  $.ajax({
    method: 'POST',
    url: '/voters',
    data: {Name: 'Meg', blurb: 'I am new'}
  }).success(function(){
    console.log('new');
  });
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}


$(document).ready(function(){
  $('.blurbToggle').click(toggleBlurb);
});
