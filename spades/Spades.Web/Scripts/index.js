var chatModel = function () {
    var self = this;
    self.curUser = function() {
        this.username = ko.observable();
        this.email = ko.observable();
        this.gravatarHash = ko.observable();
    };
    
    self.message = function () {
        this.user = self.curUser;
        this.messageText = ko.observable();
    };

    self.messages = ko.observableArray();
    self.users = ko.observableArray();
};

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
            server.send(chatModel.message);
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