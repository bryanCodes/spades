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
            $("#main-container").fadeIn();
            $("#input-message").focus();
        });
        
        chatModel.curUser.gravatarHash(gravatarHash);
    };

    client.newUser = function(user) {
        chatModel.users.push(user);
    };

    client.removeUser = function(user) {
        chatModel.users.remove(function(item) {
            return item.ConnectionId === user.ConnectionId;
        });
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

var gameModel = new (function() {
    var self = this;

    self.players = ko.observableArray([
        { Id: 0, user: null },
        { Id: 1, user: null },
        { Id: 2, user: null },
        { Id: 3, user: null }
    ]);
})();

var gameHub = (function () {
    var self = this;
    self.server = $.connection.gameHub.server;
    self.client = $.connection.gameHub.client;

    self.client.takeSeat = function(user, seatId) {
        gameModel.players[seatId].user = user;
    };
    
    return {        
        takeSeat: function(seatId) {
            self.server.takeSeat(ko.toJS(chatModel.curUser), seatId);
        }
    };
})();

function getGravatarUrl(gravatarHash, size) {
    return ["http://www.gravatar.com/avatar/", gravatarHash, "?s=", size].join("");
}

//page initialization
$(document).ready(function() {
    $.connection.hub.start();
    ko.applyBindings();
    $("#input-username").focus();
});