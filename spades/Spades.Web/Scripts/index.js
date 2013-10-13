function User(username, email, gravatarHash, connectionId){
	var self = this;
	self.username = ko.observable(username);
	self.email = ko.observable(email);
	self.gravatarHash = ko.observable(gravatarHash);
	self.connectionId = ko.observable(connectionId);
}

var baseHub = new (function() {
    var self = this;
    self.server = $.connection.baseHub.server;
    self.client = $.connection.baseHub.client;
    
    self.client.syncUsers = function (users) {
        users.forEach(function (obj) {
            chatModel.users.push(new User(
											obj.Username,
											obj.Email,
											obj.GravatarHash,
											obj.ConnectionId
										));
        });
    };

    self.client.addUser = function(user) {
        chatModel.users.push(user);
    };
    
    self.client.removeUser = function (user) {
        chatModel.users.remove(function (item) {
            return item.ConnectionId === user.ConnectionId;
        });
    };
    
    self.client.syncGame = function (game) {
        //sync players
        game.Players.forEach(gameModel.takeSeat);
        
        //I swear this is going to do more things soon.
    };

    self.client.takeSeat = function(user, seatId) {
        self.takeSeat(user, seatId);
    };
    
    self.client.signIn = function (user) {
        chatModel.curUser.gravatarHash(user.GravatarHash);
        chatModel.curUser.connectionId(user.ConnectionId);

        $("#login-form").fadeOut(400, function() {
            $("#main-container").fadeIn();
            $("#input-message").focus();
        });
    };

    return {        
        signIn: function () {
            self.server.signIn(ko.toJS(chatModel.curUser));
        }
    };
})();

var chatModel = new (function () {
    var self = this;
    
    self.curUser = new User();
    
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
    
    return {
        send: function() {
            server.send(ko.toJS(chatModel.message));
            chatModel.message.messageText('');
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
    
    self.takeSeat = function (user, seatId) {
        self.players()[seatId].user(user || {});
    };
})();

var gameHub = (function () {
    var self = this;
    self.server = $.connection.gameHub.server;
    self.client = $.connection.gameHub.client;

    self.client.takeSeat = function(user, seatId) {
        gameModel.takeSeat(user, seatId);
    };
    
    return {
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