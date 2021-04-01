var socket = io();

var players = {};

var p1Ready = false;
var p2Ready = false;
var start = false;


var $form1 = $('#form1');
var $form2 = $('#form2');
var $input1 = $('#p1Input');
var $input2 = $('#p2Input');

var $p1Ready = $('#p1').data('ready');
var $p2Ready = $('#p2').data('ready');

// player names functions
// emitting data to socket through 'player 1' socket
$form1.on('submit', function(e){
  e.preventDefault();
  if ($input1) {
    socket.emit('player 1', {name:$input1.val(), ready: $p1Ready});
    $input1.val('');
    // disable field
  }
});

// emitting data to socket through 'player 2 socket'
$form2.on('submit', function(e){
  e.preventDefault();
  if ($input2) {
    socket.emit('player 2', {name:$input2.val(), ready: $p2Ready});
    $input2.val('');
    // disable field
  }
});

socket.on('player 1', function(p1) {
  $('.p1Name').text(p1.name);
  $('#p1Submit').remove();
  $input1.remove();
  $('<span><i class="fas fa-check"></i></span>').appendTo('#form1');
  $('#p1').data('ready', p1.ready);
  p1Ready = true;

  if (p1Ready && p2Ready) {
    const startEvent = new CustomEvent('start', {detail:true});
    window.dispatchEvent(startEvent);
  }
});

socket.on('player 2', function(p2) {
  $('.p2Name').text(p2.name);
  $('#p2Submit').remove();
  $input2.remove();
  $('<span><i class="fas fa-check"></i></span>').appendTo('#form2')
  $('#p2').data('ready', p2.ready);
  p2Ready = true;

  if (p1Ready && p2Ready ) {
    const startEvent = new CustomEvent('start', {detail:true});
    window.dispatchEvent(startEvent);
  }
});

// broadcast current direction of players
// function send control through socket
const sendControls = (event) => {
  if (p1Ready && p2Ready) {
    if (event.key[0] === 'A') {
      socket.emit(`p1Snake`, event.key);
    } else {
      socket.emit(`p2Snake`, event.key);
    }
  }
}

socket.on('p1Snake', function(direction) {
  $('#p1').data('direction', direction);
});

socket.on('p2Snake', function(direction) {
  $('#p2').data('direction', direction);
});

// listen to key down when
window.addEventListener('keydown', sendControls);



