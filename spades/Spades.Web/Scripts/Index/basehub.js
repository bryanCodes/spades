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

    self.client.removeUser = function (connectionId, index) {
        chatModel.users.remove(function (item) {
            return item.connectionId === connectionId;
        });
        
        if (index !== -1) {
            gameHub.removeFromSeat(index);
        }
    };

    self.client.syncGame = function (game) {
        //sync Users
        game.Users.forEach(function (obj, index) {
            var user = new User();

            if (obj != null) {
                user = new User
                           (
                                obj.Username,
                                obj.Email,
                                obj.GravatarHash,
                                obj.ConnectionId
                            );
            }

            gameModel.takeSeat(user, index);
        });

        //I swear this is going to do more things soon.
    };

    self.client.signIn = function (user) {
        chatModel.user.gravatarHash(user.GravatarHash);
        chatModel.user.connectionId(user.ConnectionId);

        $("#login-form").fadeOut(400, function () {
            $("#main-container").fadeIn();
            $("#input-message").focus();
        });
    };

    return {
        signIn: function () {
            self.server.signIn(ko.toJS(chatModel.user));
        }
    };
})();
