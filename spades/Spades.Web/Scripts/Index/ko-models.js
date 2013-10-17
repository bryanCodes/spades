function ChatModel(user) {
    var self = this;

    self.message = new Message(user.username, user.gravatarHash, ko.observable());

    self.messages = ko.observableArray();
    self.users = ko.observableArray();
}

function GameModel(seats) {
    var self = this;

    self.seats = ko.observableArray(seats);

    self.takeSeat = function(user, seatId) {
        self.seats()[seatId].user(user || new User());
    };

    self.removeFromSeat = function(seatId) {
        self.seats()[seatId].user(new User());
    };
}

var viewModel = new (function() {
    var self = this;
    self.user = new User(ko.observable(), ko.observable(), ko.observable(), ko.observable());
    self.chat = new ChatModel(self.user);
    self.game = new GameModel([
                                new Seat(0, ko.observable(new User())),
                                new Seat(1, ko.observable(new User())),
                                new Seat(2, ko.observable(new User())),
                                new Seat(3, ko.observable(new User()))
                                ]);
})();