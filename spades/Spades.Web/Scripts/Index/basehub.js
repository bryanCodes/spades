var baseHub = new (function () {
    var self = this;
    self.server = $.connection.baseHub.server;
    self.client = $.connection.baseHub.client;

    self.client.syncUsers = function (users) {
        viewModel.chat.users.removeAll();
        users.forEach(function (obj) {
            viewModel.chat.users.push(new User(
											obj.Username,
											obj.Email,
											obj.GravatarHash,
											obj.ConnectionId
										));
        });
    };

    self.client.addUser = function (user) {
        viewModel.chat.users.push(new User(
                                        user.Username,
                                        user.Email,
                                        user.GravatarHash,
                                        user.ConnectionId
                                      ));
    };

    self.client.removeUser = function (connectionId, index) {
        viewModel.chat.users.remove(function (item) {
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

            viewModel.game.takeSeat(user, index);
        });

        //I swear this is going to do more things soon.
    };

    self.client.signIn = function (user) {
        viewModel.user.gravatarHash(user.GravatarHash);
        viewModel.user.connectionId(user.ConnectionId);

        $("#login-form").fadeOut(400, function () {
            $("#main-container").fadeIn();
            $("#input-message").focus();
        });
    };

    return {
        signIn: function () {
            self.server.signIn(ko.toJS(viewModel.user));
        }
    };
})();
