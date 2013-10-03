var chatModel = {
    username: ko.observable(),
    email: ko.observable(),
    message: ko.observable(),
    messages: ko.observableArray(),
    users: ko.observableArray()
};

var chatHub = (function () {
    var server = $.connection.chatHub.server;
    var client = $.connection.chatHub.client;

    client.addMessage = function(username, message, emailHash) {
        chatModel.messages.push({ username: username, message: message, emailHash: emailHash });
        var $chatWindow = $("#chat-window");
        $chatWindow.scrollTop($chatWindow[0].scrollHeight);

    };
    
    client.syncUsers = function(users) {
        chatModel.users(users);
    };

    client.signIn = function(username) {
        $("#login-form").fadeOut(400, function () {
            $("#chat-area").fadeIn();
            $("#input-message").focus();
        });
    };

    client.newUser = function(username) {
        chatModel.users.push({ username: username });
    };
    
    return {
        send: function() {
            server.send(chatModel.username(), chatModel.message(), chatModel.email());
            chatModel.message('');
        },
        signIn: function() {
            server.signIn(chatModel.username());
        }
    };
})();

//page initialization
$(document).ready(function() {
    $.connection.hub.start();
    ko.applyBindings(chatModel);
    $("#input-username").focus();
});