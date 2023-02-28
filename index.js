// Initialize Firebase Authentication
import { getAuth } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
const auth = getAuth(app);

// Sign in anonymously
auth.signInAnonymously()
  .then(() => {
    console.log('Signed in anonymously');
  })
  .catch((error) => {
    console.error('Error signing in anonymously:', error);
  });

// Display messages in the chat-messages div
function displayChatMessage(message) {
  var messageText = message.text;
  var messageTimestamp = message.timestamp;
  var messageElement = document.createElement('div');
  messageElement.innerText = messageText + ' - ' + new Date(messageTimestamp).toLocaleString();
  document.getElementById('chat-messages').appendChild(messageElement);
}

// Listen for new chat messages
onValue(chatMessagesRef, function(snapshot) {
  const messages = snapshot.val();
  for (const key in messages) {
    const message = messages[key];
    message.key = key;
    displayChatMessage(message);
  }
});

// Send a new chat message
const chatMessageInput = document.getElementById('chat-message-input');
const chatSendButton = document.getElementById('chat-send-button');

chatSendButton.addEventListener('click', function() {
  const messageText = chatMessageInput.value.trim();
  if (!messageText) return; // Do nothing if message is empty
  const message = {
    text: messageText,
    timestamp: Date.now()
  };
  push(chatMessagesRef, message);
  chatMessageInput.value = '';
  displayChatMessage(message); // Display message on the screen
});

chatMessageInput.addEventListener('keyup', function(event) {
  if (event.keyCode === 13) { // Activate send button on enter key
    event.preventDefault();
    chatSendButton.click();
  }
});
