var chatHub = (function () {
    var server = $.connection.chatHub.server;
    var client = $.connection.chatHub.client;

    client.addMessage = function (message) {
        chatModel.messages.push(new Message
                                    (
                                        message.Username,
                                        message.GravatarHash,
                                        message.MessageText)
                                    );

        var $chatWindow = $("#chat-window");
        $chatWindow.scrollTop($chatWindow[0].scrollHeight);
    };

    return {
        send: function () {
            server.send(ko.toJS(chatModel.curMessage));
            chatModel.curMessage.messageText('');
        }
    };
})();
