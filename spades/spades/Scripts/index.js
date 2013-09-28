//var chatModel = function() {
//    var self = this;
//    //observables
//    self.username = ko.observable();
//    self.email = ko.observable();
//    self.message = ko.observable();
//    self.messages = ko.observableArray();
    
//    //computeds
//    self.emailHash = ko.computed(function() {
//        return CryptoJS.MD5(self.email().toLowerCase());
//    });
//};

var chatModel = {
    //observables
    username: ko.observable(),
    email: ko.observable(),
    message: ko.observable(),
    messages: ko.observableArray(),

    //computeds
    //emailHash: ko.computed(function () {
    //    return CryptoJS.MD5(this.email().toLowerCase());
    //})
};

var chatHub = (function () {
    var server = $.connection.chatHub.server;
    var client = $.connection.chatHub.client;

    client.addMessage = function(username, message, emailHash) {
        chatModel.messages.push({ username: username, message: message, emailHash: emailHash });
    };
    
    return {
        send: function() {
            server.send(chatModel.username(), chatModel.message(), chatModel.email());
            chatModel.message('');
        }
    };
})();

function enterRoom() {
    $("#login-form").fadeOut(400, function() {
         $("#chat-area").fadeIn();
    });
}

//page initialization
$(document).ready(function() {
    $.connection.hub.start();
    ko.applyBindings(chatModel);
});