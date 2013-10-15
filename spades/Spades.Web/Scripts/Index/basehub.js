var baseHub = new (function () {
    var self = this;
    self.server = $.connection.baseHub.server;
    self.client = $.connection.baseHub.client;

    self.client.syncUsers = function (users) {
        chatModel.users.removeAll();
        users.forEach(function (obj) {
            chatModel.users.push(new User(
											obj.Username,
											obj.Email,
											obj.GravatarHash,
											obj.ConnectionId
										));
        });
    };

    self.client.addUser = function (user) {
        chatModel.users.push(new User(
                                        user.Username,
                                        user.Email,
                                        user.GravatarHash,
                                        user.ConnectionId
                                      ));
    };

    self.client.removeUser = function (connectionId) {
        chatModel.users.remove(function (item) {
            return item.connectionId() === connectionId;
        });
    };

    self.client.syncGame = function (game) {
        //sync players
        game.Players.forEach(gameModel.takeSeat);

        //I swear this is going to do more things soon.
    };

    self.client.signIn = function (user) {
        chatModel.curUser.gravatarHash(user.GravatarHash);
        chatModel.curUser.connectionId(user.ConnectionId);

        $("#login-form").fadeOut(400, function () {
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
