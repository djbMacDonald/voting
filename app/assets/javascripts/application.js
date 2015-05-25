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

var name, gID, emailAddress

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  gID = profile.getId();
  name = profile.getName();
  emailAddress = profile.getEmail();
  $('.g-signin2').css('display', 'none');
  $('.submissionBox').append($('<h2>').text(name + '\n' + '(' + emailAddress + ')'));
  $('.submissionBox').append($('<button>').attr('href', '').attr('class', 'voteButton').text('Vote!'));
  $('.voteButton').click(vote);
  $('.submissionBox').append($('<p>').text('Not ' + name + '? Then please sign out of Google and refresh this page.'));
  $('.submissionBox').append($('<a>').text('Sign Out').attr('href', 'http://accounts.google.com/logout').attr('target', '_blank'));
}

function vote () {
  votes = [];

  var min = Infinity;
  for (var i = 0; i < $('.drag').length; i++) {
    var candID = parseInt(/\d+/.exec($($('.drag')[i]).attr('id'))[0]);
    if (candID < min) {
      min = candID;
    }
  }

  for (var i = min; i < $('.drag').length + min; i++) {
    var cand = $('#drop' + i).children().attr('id');
    if (cand) {
      cand = parseInt(/\d+/.exec(cand)[0]);
      votes.push({candidate_id: cand, place: i-min+1});
    } else {
      alert('Please rank all candidates.');
      return false;
    }
  }

  console.log(votes);
  $.ajax({
    method: 'POST',
    url: '/voters',
    data: {voter:
      {
        name: name,
        googleID: gID,
        email: emailAddress,
        votes_attributes: votes}
    }
  }).success(function(){
    window.location = '/voted'
  }).fail(function(){
    alert('Either you\'ve already voted, or the voting for this election has been closed.')
  });
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

function submitCandidate() {
  console.log('green');
  $.ajax({
    url:'/candidates',
    method: 'POST',
    data: {candidate: {
      name: $('.candNameNew').val(),
      blurb: $('.candBlurbNew').val()
    }}
  }).success(function(){
    location.reload();
  });
}

function toggleRecords() {
  $('.votingRecords').toggle();
}

function findWinner() {
  $.ajax({
    url:'/winner',
    method:'get'
  }).success(function(re){
    $('.winner').text(re[0] + ' with ' + re[1] + ' votes.');
  });
}


$(document).ready(function(){
  $('.blurbToggle').click(toggleBlurb);
  $('.submitCandidate').click(submitCandidate);
  $('.toggleRecords').click(toggleRecords);
  $('.showWinner').click(findWinner);
});
