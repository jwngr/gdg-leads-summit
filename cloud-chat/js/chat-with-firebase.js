$(document).ready(function() {

  /**
   * Create a Firebase reference
   */
  var messagesRef = new Firebase("https://gdg-leads-summit-15.firebaseio.com/cloud-chat/messages");


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
    // CREATE ELEMENTS MESSAGE & SANITIZE TEXT
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


  /*
   * Load messages from Firebase
   *
   * This metthod is called when the existing
   * messages are first received and when new
   * message are added to Firebase.
   */
  messagesRef.limitToLast(10).on("child_added", function (snapshot) {
    // GET DATA
    var data = snapshot.val();
    var username = data.name || "anonymous";
    var message = data.text;

    // ADD MESSAGE
    addMessage(username, message);
  });


  /**
   * Listen for user input
   *
   * This method listens for each keypress on the message input field and saves
   * the data to Firebase when content is submitted.
   */
  $newMessage.keypress(function (e) {
    // GET FIELD VALUES
    var username = $username.val();
    var message = $newMessage.val().trim();

    // SAVE MESSAGE WHEN "ENTER" IS PRESSED
    if (e.keyCode == 13 && message.length) {
      messagesRef.push({name:username, text:message});
    }
  });
});
