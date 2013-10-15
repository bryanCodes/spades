var gameHub = (function () {
    var self = this;
    self.server = $.connection.gameHub.server;
    self.client = $.connection.gameHub.client;

    self.client.takeSeat = function (user, seatId) {
        gameModel.takeSeat(new User
                               (
                                   user.Username,
                                   user.Email,
                                   user.GravatarHash,
                                   user.ConnectionId
                                ), seatId);
    };

    self.client.removeFromSeat = function (seatId) {
        gameModel.removeFromSeat(seatId);
        //do some game pausing/freaking out... you know, once we get to that point
    };

    return {
        takeSeat: function (index) {
            self.server.takeSeat(ko.toJS(chatModel.user), index);
        },
        removeFromSeat: function(index) {
            self.server.removeFromSeat(index);
        }
    };
})();
