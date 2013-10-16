var user = new (function() {

});

var chatModel = new (function () {
    var self = this;

    self.user = new User(ko.observable(), ko.observable(), ko.observable(), ko.observable());

    self.message = new Message(self.user.username, self.user.gravatarHash, ko.observable());

    self.messages = ko.observableArray();
    self.users = ko.observableArray();
})();

var gameModel = new (function() {
    var self = this;

    self.users = ko.observableArray([
        ko.observable(new User()),
        ko.observable(new User()),
        ko.observable(new User()),
        ko.observable(new User())
    ]);

    self.takeSeat = function(user, seatId) {
        self.users()[seatId](user || new User());
    };

    self.removeFromSeat = function(seatId) {
        self.users()[seatId](new User());
    };
})();