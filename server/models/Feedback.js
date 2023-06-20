const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        detail: {
            type: String,
            required: true
        },
        category: {
            type: String,
            enum: ['UI', 'UX', 'Enhancement', 'Bug', 'Feature'],
            required: true
        },
        status: {
            type: String,
            enum: ['Planned', 'In-Progress', 'Live'],
            default: 'Planned'
        },
        upvotes: {
            type: Number,
            default: 0
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        comments: [
            {
                author: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                    required: true
                },
                text: {
                    type: String,
                    required: true,
                    maxLength: 250
                },
                replies: [
                    {
                        author: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: 'User',
                            required: true
                        },
                        to: {
                            type: mongoose.Schema.Types.ObjectId,
                            required: true
                        },
                        text: {
                            type: String,
                            required: true,
                            maxLength: 250
                        }
                    }
                ]
            },
            {
                timestamps: true
            }
        ]
    },
    {
        timestamps: true
    }
);

const FeedbackModel = mongoose.model('Feedback', FeedbackSchema);

module.exports = FeedbackModel;