var chatModel = {
    username: ko.observable(),
    message: ko.observable(),
    messages: ko.observableArray(),
    addMessage: function (message, user) {
        this.messages.push({ username: user, message: message });
    }
};

var chatHub = {
    send: function() {
        chat.server.send(chatModel.message(), chatModel.username());
        chatModel.message('');
    }
};