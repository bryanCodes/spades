var chatModel = {
    username: ko.observable(),
    email: ko.observable(),
    message: ko.observable(),
    messages: ko.observableArray(),
};

var chatHub = (function () {
    var server = $.connection.chatHub.server;
    var client = $.connection.chatHub.client;

    client.addMessage = function(username, message, emailHash) {
        chatModel.messages.push({ username: username, message: message, emailHash: emailHash });
    };
    
    return {
        send: function() {
            server.send(chatModel.username(), chatModel.message(), chatModel.email());
            chatModel.message('');
        }
    };
})();

function enterRoom() {
    $("#login-form").fadeOut(400, function () {
         $("#chat-area").fadeIn();
         $("#input-message").focus();
    });
}

//page initialization
$(document).ready(function() {
    $.connection.hub.start();
    ko.applyBindings(chatModel);
    $("#input-username").focus();
});