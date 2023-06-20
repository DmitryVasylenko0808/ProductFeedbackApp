const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        surname: {
            type: String,
            required: true
        },
        login: {
            type: String,
            required: true,
            unique: true
        },
        passwordHash: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ['User', 'Admin'],
            default: 'User'
        },
        avatar: {
            type: String
        },
        upvotedFeedbacks: [
            {
                feedback_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Feedback'
                }
            }
        ]
    },
    {
        timestamps: true
    }
);

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;