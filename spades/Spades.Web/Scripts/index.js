var chatModel = new (function () {
    var self = this;
    
    self.curUser = {
        username: ko.observable(),
        email: ko.observable(),
        gravatarHash: ko.observable(),
    };
    
    self.message = {
        user: self.curUser,
        messageText: ko.observable()
    };

    self.messages = ko.observableArray();
    self.users = ko.observableArray();
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

    client.removeUser = function(user) {
        chatModel.users.remove(user);
    };
    
    return {
        send: function() {
            server.send(ko.toJS(chatModel.message));
            chatModel.message.messageText('');
        },
        signIn: function() {
            server.signIn(ko.toJS(chatModel.curUser));
        }
    };
})();

//page initialization
$(document).ready(function() {
    $.connection.hub.start();
    ko.applyBindings(chatModel);
    $("#input-username").focus();
});