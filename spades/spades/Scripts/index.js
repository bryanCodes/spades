var chatModel = {
    username: ko.observable(),
    message: ko.observable(),
    messages: ko.observableArray(),
    addMessage: function (user, message) {
        this.messages.push({ username: user, message: message });
    }
};

var chatHub = (function () {
    $.connection.hub.start();
    var server = $.connection.chatHub.server;
    var client = $.connection.chatHub.client;

    client.addMessage = function(user, message) {
        chatModel.addMessage(user, message);
    };
    
    return {
        send: function() {
            server.send(chatModel.username(), chatModel.message());
            chatModel.message('');
        }
    };
})();