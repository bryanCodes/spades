function user(username, email, gravatarHash, connectionId){
	var self = this;
	self.username = ko.observable(username);
	self.email = ko.observable(email);
	self.gravatarHash = ko.observable(gravatarHash);
	self.connectionId = ko.observable(connectionId);
}

var chatModel = new (function () {
    var self = this;
    
    self.curUser = new user();
    
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
        users.forEach(function(obj){
			chatModel.users.push(new user(
											obj.Username, 
											obj.Email, 
											obj.GravatarHash, 
											obj.ConnectionId
										));
		});
        gameHub.syncGame();
    };

    client.signIn = function(user) {
        $("#login-form").fadeOut(400, function () {
            $("#main-container").fadeIn();
            $("#input-message").focus();
        });
        
        chatModel.curUser.gravatarHash(user.GravatarHash);
        chatModel.curUser.connectionId(user.ConnectionId);
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
        { Id: 0, user: ko.observable({}) },
        { Id: 1, user: ko.observable({}) },
        { Id: 2, user: ko.observable({}) },
        { Id: 3, user: ko.observable({}) }
    ]);
})();

var gameHub = (function () {
    var self = this;
    self.server = $.connection.gameHub.server;
    self.client = $.connection.gameHub.client;

    self.client.takeSeat = function (user, seatId) {
        self.takeSeat(user, seatId);
    };

    self.client.syncGame = function(game) {
        //sync players
        game.Players.forEach(self.takeSeat);
    };

    self.takeSeat = function(user, seatId) {
        gameModel.players()[seatId].user(user || {});
    };
    
    return {
        syncGame: function() {
            self.server.syncGame();
        },
        takeSeat: function(data) {
            self.server.takeSeat(ko.toJS(chatModel.curUser), data);
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