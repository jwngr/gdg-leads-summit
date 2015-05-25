$(document).ready(function() {

  /**
   * Register DOM elements
   *
   * We register DOM elements so we can use them over and over efficiently.
   * These vars are prefixed with $ to indicate they are registered with jQuery.
   */
  var $newMessage = $("#new-message");
  var $username = $("#username");
  var $messages = $("#messages");


  /**
   * Add a new message
   *
   * We create a new DOM element with the message's username and text and then
   * append that to our messages list. We clean up by scrolling to the bottom
   * of the messages list and by clearing the new message input.
   */
  function addMessage(username, message) {
    //CREATE ELEMENTS MESSAGE & SANITIZE TEXT
    var messageElement = $("<li>");
    var nameElement = $("<strong class='example-chat-username'></strong>");
    nameElement.text(username);
    messageElement.text(message).prepend(nameElement);

    // ADD MESSAGE TO LIST
    $messages.append(messageElement);

    // SCROLL TO BOTTOM OF CHAT BOX
    $messages[0].scrollTop = $messages[0].scrollHeight;

    // RESET NEW MESSAGE INPUT
    $newMessage.val("");
  }


  /**
   * Listen for user input
   *
   * This method listens for each keypress on the message input field and adds
   * a new message when content is submitted.
   */
  $newMessage.keypress(function (e) {
    // GET FIELD VALUES
    var username = $username.val();
    var message = $newMessage.val().trim();

    // SAVE MESSAGE WHEN "ENTER" IS PRESSED
    if (e.keyCode == 13 && message.length) {
      addMessage(username, message);
    }
  });
});
