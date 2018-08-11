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

        //replace type use an AJAX verb to retrieve the latest data;
        type: 'GET',
        url: 'http://parse.la.hackreactor.com/chatterbox/classes/messages',
        contentType : 'application/json',
        data: "order=-createdAt",
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

    for(var i = data.results.length - 1; i > 0; i--){
        var x = data.results[i]
        $('#chats').append(`<div> ${x.username} : ${x.text} </div>`);
    }
}

app.renderRoom = function(room) {
    // $('#roomSelect').append('<div>' + $(room) + '</div>');
    $('#roomSelect').append('<div id="#roomSelect"><div>');
}

app.handleUsernameClick = function() {
    console.log('hi')
    this.friends.push($(this.message.username));
}

$( document ).ready(function() {
  app.init();
  var textInput = JSON.stringify(document.getElementById("text").value);
  $('input').click(function() {
    console.log(textInput)
    $('#chats').append(`<div> doge : ${textInput} </div>`)
  });
});
