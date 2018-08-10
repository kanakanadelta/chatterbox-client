var app = {

};

app.server = 'http://parse.LA.hackreactor.com/chatterbox/classes/messages';

app.init = function() {
    
};

app.send = function() {
    $.ajax({
        // This is the url you should use to communicate with the parse API server.
        url: 'http://parse.LA.hackreactor.com/chatterbox/classes/messages',
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
        url: 'http://parse.LA.hackreactor.com/chatterbox/classes/messages',
        type: 'GET',
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

app.clearMessages = function() {
    $('#chats').children().remove();
}

app.renderMessage = function(message) {
    $('#chats').html('<div>' + $(message) + '</div>');  
}

app.renderRoom = function(room) {
    $('#roomSelect').append('<div>' + $(room) + '</div>');
}

app.handleUsernameClick = function() {
    console.log('hi')
    friends.push($(message.username));
}

$('.username').on('click',function() {
    app.handleUsernameClick()
});


//////Dynamic Variables//////

var message = {
    username: 'Mel Brooks',
    text: 'It\'s good to be the king',
    roomname: 'lobby'
};

var friends = [];

////End Dynamic Variables////