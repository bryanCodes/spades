// var curUser = new User(ko.observable(), ko.observable(), ko.observable(), ko.observable());

// var chatModel = new (function () {
//     var self = this;

//     self.message = new Message(curUser.username, self.user.gravatarHash, ko.observable());

//     self.messages = ko.observableArray();
//     self.users = ko.observableArray();
// })();

// var gameModel = new (function() {
//     var self = this;

//     self.users = ko.observableArray([
//         ko.observable(new User()),
//         ko.observable(new User()),
//         ko.observable(new User()),
//         ko.observable(new User())
//     ]);

//     self.takeSeat = function(user, seatId) {
//         self.users()[seatId](user || new User());
//     };

//     self.removeFromSeat = function(seatId) {
//         self.users()[seatId](new User());
//     };
// })();
function ChatModel(user) {
    var self = this;

    self.message = new Message(user.username, user.gravatarHash, ko.observable());

    self.messages = ko.observableArray();
    self.users = ko.observableArray();
};

function GameModel() {
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
};

var viewModel = new (function() {
    var self = this;
    self.user = new User(ko.observable(), ko.observable(), ko.observable(), ko.observable());
    self.chat = new ChatModel(self.user);
    self.game = new GameModel();
})();