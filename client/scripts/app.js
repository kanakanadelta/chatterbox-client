// YOUR CODE HERE:
var app = {

    //////Dynamic Variables//////

     friends : [],

    ////End Dynamic Variables////

};

//////DOM Main Elements//////

var $body = $('body');
// // $body.html('');
// var $title = $('<h1>CHATTERBAWKS</h1>');
// $title.appendTo('body');
// var $messageBody

///End Dom Main Elements////

app.server = 'http://parse.la.hackreactor.com/chatterbox/classes/messages';

//////INIT///////

app.init = function() {
    app.fetch();
    console.log()
    // app.renderMessage();
};

/////INIT///////



app.send = function(message) {
    $.ajax({
  // This is the url you should use to communicate with the parse API server.
  url: 'http://parse.CAMPUS.hackreactor.com/chatterbox/classes/messages',
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
        //use an AJAX verb to retrieve the latest data;
        type: 'GET',
        url: 'http://parse.la.hackreactor.com/chatterbox/classes/messages',
        success: function (data) {
          console.log('chatterbox: Message sent', data);
          app.renderMessage(data)
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

app.renderMessage = function(data) {
    
    console.log(data.results[0].username)
    data.results.forEach(function(message) {
        $('#chats').append(`<div> ${message.username}: ${message.text} </div>`);
    })
    // $('#chats').append('<div>' + $(this.message) + '</div>');  
    //$chat = $('#chats').append('...'); 
    // console.log(app.fetch()[0])

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