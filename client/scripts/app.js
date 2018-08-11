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
    //retrieve messages from server
    app.fetch();
    
    ////////MESSAGES////////////
    //blockCode for message input
    //event listener for click
    $('input').click(function() {
        //retrieve username from search function box within html script
        var user = window.location.search;
        //slice to get only the username string from the previous value
        var username = window.location.search.slice(user.indexOf('=') + 1, user.length);
        //jQuery to prepend our new message to the chatbox
        var roomValue = document.getElementById("roomNameSelector").value;

        if (document.getElementById("text").value.slice(0, 8) !== '<script>') {
            $('#chats').prepend(`<div> ${username} : ${document.getElementById("text").value} </div>`);
            
            console.log('what',document.getElementById("text").value)

            //object literal to store message and its data to send
            var msg= { 
                username: username,
                text: document.getElementById("text").value,
                roomname: roomValue
            }
            //method invocation to send message data to server
            app.send(msg);
        }
    });

    ///////BEFRIENDING///////////
    $('#userFriend').click(function(){
        alert('hah!');
    })

};

/////END OF INIT///////



app.send = function(message) {
    $.ajax({
  // This is the url you should use to communicate with the parse API server.
        url: 'http://parse.la.hackreactor.com/chatterbox/classes/messages',
        type: 'POST',
        data: JSON.stringify(message),
        contentType: 'application/json',
        success: function (data) {
            console.log('chatterbox: Message sent', message);
            app.renderMessage(message)
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

        //retrieve latest data from server:
        data: "order=-createdAt",

        success: function (data) {
            //start of success method
                //log of latest messages received
            console.log('chatterbox: Message sent', data);

            //FETCH.AJAX// ROOM //
            //if selector is at current room selected
            var roomValue = document.getElementById("roomNameSelector").value;
            
            var dataResults = data.results;
            $('#roomNameSelector').change(function() {
                roomValue = document.getElementById("roomNameSelector").value;
                console.log( "Handler for .change() called." )
                console.log('room', roomValue)
                if (roomValue) {
                    dataResults = dataResults.filter(function(eachRoom) {
                        console.log(eachRoom.roomname === roomValue)
                        if(eachRoom.roomname === roomValue){
                            return eachRoom;
                        }
                    })
                }
                console.log('filtered data', dataResults)
                $('#chats').each(function(chits) {
                    console.log('this ischits?',this)
                    // this.each(function() {
                    //     if (!document.getElementById("roomValue")) {
                    //         console.log('chits', this)
                    //         this.remove();
                    //     }
                    // });
                    // console.log($("#chats").getElementById("roomValue"))
                })
                $('#chats').remove()
                $('body').append('<div id="chats"></div>');
                app.renderMessage(dataResults);

            })
            app.renderMessage(dataResults)
            console.log('changed', roomValue)
            //   //
            
            
            // app.renderMessage(dataResults)
            //   //
            console.log(data.results[1].roomname)
            var storage = [];
            
            data.results.forEach(function(message, i) {
                if (data.results[i].roomname) {
                    if (!storage.includes(data.results[i].roomname)) {
                        storage.push(data.results[i].roomname);
                        $('#roomNameSelector').prepend(`<option value='${data.results[i].roomname}'> ${data.results[i].roomname} </option>`);
                    }   
                }
            });

            console.log(storage)
            //FETCH.AJAX// ROOM //

            //end of fetch.success method
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

    for(var i = 0; i < data.length; i++){
        var x = data[i]
        //console.log('rendermsg', x)
        $('#chats').append(`<div id="${x.roomname}"> <a href="#" id="userFriend">${x.username}</a> : ${x.text} </div>`);
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
});

