const socket = io('http://localhost:3000');

document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username-input').value;
    const room = document.getElementById('room-input').value;

    if (username && room) {
        // Emit joinRoom event to the server
        socket.emit('joinRoom', { username, room });

        // Hide login and show chat container
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('chat-container').style.display = 'block';

        // Set up message sending
        document.getElementById('message-form').addEventListener('submit', function (e) {
            e.preventDefault();
            const messageText = document.getElementById('message-input').value;
            if (messageText) {
                const messageData = {
                    username,
                    text: messageText,
                    room,
                    timestamp: new Date(),
                };
                socket.emit('sendMessage', messageData);
                document.getElementById('message-input').value = '';
            }
        });

        // Set up typing indicator
        const messageInput = document.getElementById('message-input');
        messageInput.addEventListener('input', () => {
            if (messageInput.value) {
                socket.emit('typing', { username, room });
            } else {
                socket.emit('stopTyping', { room });
            }
        });
        messageInput.addEventListener('blur', () => socket.emit('stopTyping', { room }));
    }
});

// Listen for messages
socket.on('message', (message) => {
    const messageDisplay = document.getElementById('message-display');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `
        <strong>${message.username}</strong> (${new Date(message.timestamp).toLocaleTimeString()}): ${message.text}
    `;
    messageDisplay.appendChild(messageElement);
    messageDisplay.scrollTop = messageDisplay.scrollHeight;
});

// Listen for chat history
socket.on('chatHistory', (messages) => {
    const messageDisplay = document.getElementById('message-display');
    messages.forEach((message) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.innerHTML = `
            <strong>${message.username}</strong> (${new Date(message.timestamp).toLocaleTimeString()}): ${message.text}
        `;
        messageDisplay.appendChild(messageElement);
    });
    messageDisplay.scrollTop = messageDisplay.scrollHeight;
});

// Listen for typing indicator
socket.on('typing', (username) => {
    const typingElement = document.getElementById('typing-indicator');
    typingElement.innerText = `${username} is typing...`;
    typingElement.style.display = 'block';
});

socket.on('stopTyping', () => {
    const typingElement = document.getElementById('typing-indicator');
    typingElement.style.display = 'none';
});

// Listen for user count update
socket.on('userCount', (count) => {
    document.getElementById('user-connected-container').innerText = `Users connected: ${count}`;
});
