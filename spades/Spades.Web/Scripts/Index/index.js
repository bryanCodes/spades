function User(username, email, gravatarHash, connectionId){
	var self = this;
	self.username = username;
	self.email = email;
	self.gravatarHash = gravatarHash;
	self.connectionId = connectionId;
}

function Message(username, gravatarHash, messageText) {
    var self = this;
    self.username = username;
    self.gravatarHash = gravatarHash;
    self.messageText = messageText;
}

function Seat(id, user) {
    var self = this;
    self.user = user;
}

function getGravatarUrl(gravatarHash, size) {
    return ["http://www.gravatar.com/avatar/", gravatarHash, "?s=", size].join("");
}

//Array.prototype.indexOf = function(predicate) {
//    var self = this;
//    self.forEach(function(item, index) {
//        if (predicate(item)) {
//            return index;
//        }
//    });

//    return -1;
//};

//page initialization
$(document).ready(function() {
    $.connection.hub.start();
    ko.applyBindings();
    $("#input-username").focus();
});