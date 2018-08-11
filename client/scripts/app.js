

var app = {

    //////Dynamic Variables//////

     friends : [],

    ////End Dynamic Variables////

};

//////DOM Main Elements//////

var $body = $('body');
// $body.html('');
var $title = $('<h1>CHATTERBAWKS</h1>');
$title.appendTo('body');
// var $messageBody

///End Dom Main Elements////

app.server = 'http://parse.la.hackreactor.com/chatterbox/classes/messages';

app.init = function() {
    
    app.fetch();
};

app.send = function(message) {
    $.ajax({
        // This is the url you should use to communicate with the parse API server.
        url: 'http://parse.la.hackreactor.com/chatterbox/classes/messages',
        type: 'POST',
        data: JSON.stringify(message),
        contentType: 'application/json',
        success: function (data) {
          console.log('chatterbox: Message sent');
        },
        error: function (data) {
          // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.error('chatterbox: Failed to send message', data);
        }
      });
}


app.fetch = function() {
    $.ajax({
        // This is the url you should use to communicate with the parse API server.
        type: 'GET',
        url: 'http://parse.la.hackreactor.com/chatterbox/classes/messages',
        success: function (data) {
          console.log('chatterbox: Message sent');
        },
        error: function (data) {
          // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.error('chatterbox: Failed to send message', data);
        }
      });
}

app.clearMessages = function() {
    $('#chats').children().remove();
}

app.renderMessage = function() {
    $username = $('<div class="message"><a href="#"></a><div>');
    $text = $('<div class="message"><p></p></div>');
    $roomName = $('<div class="message"><p></p></div>');

    // $('#chats').append('<div>' + $(this.message) + '</div>');  
    $chat = $('#chats').append('<div>' + $(message) + '</div>'); 
    $chat.appendTo('#main')
}

app.renderRoom = function(room) {
    // $('#roomSelect').append('<div>' + $(room) + '</div>');
    $('#roomSelect').append('<div id="#roomSelect"><div>');
}   

app.handleUsernameClick = function() {
    console.log('hi')
    this.friends.push($(this.message.username));
}

app.init();

