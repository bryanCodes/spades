var chatModel = {
    username: ko.observable(),
    message: ko.observable(),
    messages: ko.observableArray(),
    addMessage: function (message, user) {
        this.messages.push({ username: user, message: message });
    }
};

var chatHub = (function () {
    $.connection.hub.start();
    var server = $.connection.chatHub.server;
    var client = $.connection.chatHub.client;

    client.addMessage = function(message, user) {
        chatModel.addMessage(message, user);
    };

    function send(message, username) {
        server.send(message, username);
    }
    
    //function addMessage(message, user) {
    //    chatModel.addMessage(message, user);
    //}

    return {
        send: function() {
            send(chatModel.message(), chatModel.username());
            chatModel.message('');
        }
};
})();