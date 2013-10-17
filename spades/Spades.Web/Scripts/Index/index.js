function User(username, email, gravatarHash, connectionId){
	var self = this;
	self.username = username;
	self.email = email;
	self.gravatarHash = gravatarHash;
	self.connectionId = connectionId;

    self.isCurrent = ko.computed(function(){
        if(!self.connectionId || !viewModel || !viewModel.user.connectionId()){
            return false;
        }

        return (self.connectionId || self.connectionId()) === viewModel.user.connectionId();
    });
}

function Message(username, gravatarHash, messageText) {
    var self = this;
    self.username = username;
    self.gravatarHash = gravatarHash;
    self.messageText = messageText;
}

function Seat(id, user) {
    var self = this;
    self.id = id;
    self.user = user;
}

function getGravatarUrl(gravatarHash, size) {
    return ["http://www.gravatar.com/avatar/", gravatarHash, "?s=", size].join("");
}

function getObservableUser(username, email, gravatarHash, connectionId){
    return new User(ko.observable(username), ko.observable(email), ko.observable(gravatarHash), ko.observable(connectionId));
}

//page initialization
$(document).ready(function() {
    $.connection.hub.start();

    ko.applyBindings(viewModel);
    $("#input-username").focus();
});