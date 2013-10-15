var gameHub = (function () {
    var self = this;
    self.server = $.connection.gameHub.server;
    self.client = $.connection.gameHub.client;

    self.client.takeSeat = function (user, seatId) {
        gameModel.takeSeat(user, seatId);
    };

    return {
        takeSeat: function (data) {
            self.server.takeSeat(ko.toJS(chatModel.curUser), data);
        }
    };
})();
