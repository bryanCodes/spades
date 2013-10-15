var chatModel = new (function () {
    var self = this;

    self.curUser = new User();
    self.messageText = ko.observable();

    self.messages = ko.observableArray();
    self.users = ko.observableArray();
})();


var gameModel = new (function () {
    var self = this;

    self.players = ko.observableArray([
        { Id: 0, user: ko.observable({}) },
        { Id: 1, user: ko.observable({}) },
        { Id: 2, user: ko.observable({}) },
        { Id: 3, user: ko.observable({}) }
    ]);

    self.takeSeat = function (user, seatId) {
        self.players()[seatId].user = user || {};
    };

    self.removeFromSeat = function (seatId) {
        self.players()[seatId].user = {};
    };
})();
