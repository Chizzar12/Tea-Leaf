// Chat App JS

// Initialize Firebase
var firebaseConfig = {
  // Your Firebase configuration
};

firebase.initializeApp(firebaseConfig);

// Get a reference to the Firebase Realtime Database
var database = firebase.database();

// Get the chat message input field and chat send button
var chatMessageInput = document.getElementById("chat-message-input");
var chatSendButton = document.getElementById("chat-send-button");

// Get a reference to the chat messages div
var chatMessages = document.getElementById("chat-messages");

// Listen for new chat messages and display them in real-time
database.ref("chat-messages").on("child_added", function(snapshot) {
  var chatMessage = snapshot.val();
  var chatMessageElement = document.createElement("p");
  chatMessageElement.innerText = chatMessage.message;
  chatMessages.appendChild(chatMessageElement);
});

// Listen for new chat messages to be added
chatSendButton.addEventListener("click", function() {
  var chatMessageText = chatMessageInput.value;

  // Create a new chat message in Firebase Realtime Database
  var chatMessage = {
    message: chatMessageText
  };
  database.ref("chat-messages").push(chatMessage);

  // Clear the chat message input field
  chatMessageInput.value = "";
});

