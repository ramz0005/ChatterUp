import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    room: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    profilePicture: {
        type: String,  // Assuming profilePicture is a URL or Base64 string
        default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
    }
});

export const Message = mongoose.model('Message', messageSchema);