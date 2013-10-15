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

function getGravatarUrl(gravatarHash, size) {
    return ["http://www.gravatar.com/avatar/", gravatarHash, "?s=", size].join("");
}

//page initialization
$(document).ready(function() {
    $.connection.hub.start();
    ko.applyBindings();
    $("#input-username").focus();
});