var chatModel = (function () {
    var model = {};
    
    model.curUser = {
        username: ko.observable(),
        email: ko.observable(),
        gravatarHash: ko.observable()
    };
    
    model.message = {
        user: model.curUser,
        messageText: ko.observable()
    };

    model.messages = ko.observableArray();
    model.users = ko.observableArray();

    //ko.applyBindings(model);
    return model;
})();

var chatHub = (function () {
    var server = $.connection.chatHub.server;
    var client = $.connection.chatHub.client;

    client.addMessage = function(message) {
        chatModel.messages.push(message);
        var $chatWindow = $("#chat-window");
        $chatWindow.scrollTop($chatWindow[0].scrollHeight);

    };
    
    client.syncUsers = function(users) {
        chatModel.users(users);
    };

    client.signIn = function(gravatarHash) {
        $("#login-form").fadeOut(400, function () {
            $("#chat-area").fadeIn();
            $("#input-message").focus();
        });
        
        chatModel.curUser.gravatarHash(gravatarHash);
    };

    client.newUser = function(user) {
        chatModel.users.push(user);
    };
    
    return {
        send: function() {
            server.send({ user: chatModel.curUser, messageText: chatModel.message.messageText() });
            chatModel.message.messageText('');
        },
        signIn: function() {
            server.signIn(chatModel.curUser);
        }
    };
})();

//page initialization
$(document).ready(function() {
    $.connection.hub.start();
    ko.applyBindings(chatModel);
    $("#input-username").focus();
});