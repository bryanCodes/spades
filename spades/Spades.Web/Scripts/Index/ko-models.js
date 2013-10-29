function ChatModel(user) {
    var self = this;

    self.message = new Message(user.username, user.gravatarHash, ko.observable());

    self.messages = ko.observableArray();
    self.users = ko.observableArray();
}

function GameModel(seats) {
    var self = this;

    self.seats = seats;

    self.takeSeat = function(user, seatId) {
        self.seats[seatId].user(user);
    };

    self.removeFromSeat = function(seatId) {
        self.seats[seatId].user(getObservableUser());
    };
}

var viewModel = new (function() {
    var self = this;
    self.user = getObservableUser();
    self.isPlaying = ko.observable(false);
    self.chat = new ChatModel(self.user);
    self.game = new GameModel([
                                new Seat(0, ko.observable(getObservableUser())),
                                new Seat(1, ko.observable(getObservableUser())),
                                new Seat(2, ko.observable(getObservableUser())),
                                new Seat(3, ko.observable(getObservableUser()))
                                ]);
})();