import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import http from 'http';
import { connectToDatabase } from './db.config.js';
import { Message } from './models/message.schema.js';

const app = express();
app.use(cors());
app.use(express.static('public'))

const server = new http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
});

let users = [];

io.on('connection', (socket) => {
    // Handle user joining a room
    socket.on('joinRoom', ({ username, room, profilePicture }) => {
        socket.join(room);

        // Store user info
        const user = { id: socket.id, username, room, profilePicture };
        users.push(user);

        // Send chat history to the newly connected user
        Message.find({ room }).sort('timestamp').then((messages) => {
            socket.emit('chatHistory', messages);
        });

        // Notify others that a new user has joined
        socket.to(room).emit('message', {
            username: 'System',
            text: `${username} has joined the chat`,
            profilePicture: "https://media.gettyimages.com/id/1479744011/vector/robot-artificial-intelligence-avatar-icon-profile-diverse-bot-face-for-chatbot-and-social.jpg?s=2048x2048&w=gi&k=20&c=1vGyTCoivNiuIYtOzqxSs4i4xswkzTKxkt245EeDRRM=", // System messages do not need a profile picture
            timestamp: new Date(),
        });

        // Update the user count
        io.to(room).emit('userCount', users.filter((user) => user.room === room).length);
    });

    // Handle message sending
    socket.on('sendMessage', (messageData) => {
        const message = new Message(messageData);
        message.save().then(() => {
            io.to(messageData.room).emit('message', messageData);
        });
    });

    // Handle typing and stop typing events
    socket.on('typing', ({ username, room }) => {
        socket.to(room).emit('typing', username);
    });

    socket.on('stopTyping', ({ room }) => {
        socket.to(room).emit('stopTyping');
    });

    // Handle user disconnection
    socket.on('disconnect', () => {
        // Find and remove the disconnected user
        const user = users.find((user) => user.id === socket.id);
        if (user) {
            users = users.filter((user) => user.id !== socket.id);

            io.to(user.room).emit('message', {
                username: 'System',
                text: `${user.username} has left the chat`,
                profilePicture: "https://media.gettyimages.com/id/1479744011/vector/robot-artificial-intelligence-avatar-icon-profile-diverse-bot-face-for-chatbot-and-social.jpg?s=2048x2048&w=gi&k=20&c=1vGyTCoivNiuIYtOzqxSs4i4xswkzTKxkt245EeDRRM=", // System messages do not need a profile picture
                timestamp: new Date(),
            });

            io.to(user.room).emit('userCount', users.filter((user) => user.room === user.room).length);
        }
    });
});



server.listen(3000, () => {
    console.log("Server is running on port 3000");
    connectToDatabase();
});

