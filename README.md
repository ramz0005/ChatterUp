# ChatterUp

An interactive real-time chat application built with **Node.js**, **Express.js**, **Socket.io**, and **MongoDB**, designed to deliver a seamless and engaging chat experience.

## Features
- **Real-time Messaging:** Instant message broadcasting using Socket.io.
- **User Onboarding:** Simple user input to join the chat with a welcome message.
- **Chat History Access:** Retrieve previous messages from MongoDB.
- **Typing Indicators:** Display when users are typing.
- **User Notifications:** Notify when users join or leave the chat.
- **Profile Pictures:** Display user avatars consistently.
- **Dynamic UI:** Responsive and user-friendly interface built with HTML, CSS, and JavaScript.

## Tech Stack
- **Backend:** Node.js, Express.js
- **Frontend:** HTML, CSS, JavaScript
- **Database:** MongoDB
- **Real-time Communication:** Socket.io

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ChatterUp.git
   ```
2. Navigate to the project directory:
   ```bash
   cd ChatterUp
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   npm start
   ```
5. Open your browser and go to:
   ```
   http://localhost:3000/
   ```

## Project Structure
- `server.js` - Main server file
- `public/` - Contains client-side code (HTML, CSS, JS)
- `routes/` - Express routes
- `models/` - Mongoose models for MongoDB
- `sockets/` - Socket.io event handlers

## Future Enhancements
- Private chat rooms
- Message reactions
- User status indicators (online/offline)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License.

---

*Happy chatting with ChatterUp!* 😊

