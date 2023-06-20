const FeedbackModel = require('../models/Feedback');
const UserModel = require('../models/User');

class FeedbacksController {
    static async getAll(req, res) {
        try {
            let results;
            if (req.params.category === 'All') {
                results = await FeedbackModel.find().sort({ upvotes: req.params.order });
            }
            else {
                results = await FeedbackModel.find({ category: req.params.category }).sort({ upvotes: req.params.order });
            }

            if (results.length === 0) {
                return res.status(404).json({ errorMessage: 'Feedbacks are not found' });
            }

            let feedbacks = results.map(f => {
                const temp = { ...f._doc, countComments: f.comments.length };
                const { comments, ...feedbackData } = temp;
                return { ...feedbackData };
            });

            res.json({ feedbacks });
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ errorMessage: 'Server error' });
        }
    }

    static async getOne(req, res) {
        try {
            let feedback = await FeedbackModel.findById(req.params.id).populate('comments.author', 'name surname login avatar');
            if (!feedback) {
                return res.status(404).json({ errorMessage: "Feedback is not found" });
            }

            feedback = {...feedback._doc, countComments: feedback.comments.length};

            res.json({ feedback });
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ errorMessage: "Server error" });
        }
    }

    static async add(req, res) {
        try {
            const doc = new FeedbackModel(
                {
                    title: req.body.title,
                    detail: req.body.detail,
                    category: req.body.category,
                    author: req.userId
                }
            );
            await doc.save();

            res.json({ success: true, message: "Feedback has been succesfully added" });
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ success: false, errorMessages: ['Server error'] });
        }
    }

    static async edit(req, res) {
        try {
            await FeedbackModel.updateOne(
                {
                    _id: req.params.id
                },
                {
                    title: req.body.title,
                    detail: req.body.detail,
                    category: req.body.category,
                    status: req.body.status
                }
            );

            res.json({ success: true, message: "Feedback has been succesfully edited" });
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ success: false, errorMessages: ['Server error'] });
        }
    }

    static async upvote(req, res) {
        try {
            await FeedbackModel.updateOne(
                {
                    _id: req.params.id
                },
                {
                    $inc: { upvotes: 1 }
                }
            );

            await UserModel.updateOne(
                {
                    _id: req.userId
                },
                {
                    $push: { upvotedFeedbacks: { feedback_id: req.params.id } }
                }
            )

            res.json({ success: true });
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ success: false, errorMessages: ['Server error'] });        
        }
    }

    static async postComment(req, res) {
        try {
            const comment = {
                author: req.userId,
                text: req.body.text
            };

            let feedback = await FeedbackModel.findByIdAndUpdate(
                req.params.id,
                {
                    $push: { comments: comment }
                },
                {
                    new: true
                }
            ).populate('comments.author', 'name surname login avatar');

            feedback = {...feedback._doc, countComments: feedback.comments.length}

            res.json({ success: true, feedback });
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ success: false, errorMessages: ['Server error'] });
        }
    }

    /* static async replyComment(req, res) {
        try {
            const comment = {
                author: req.userId,
                to: req.params.commentId,
                text: req.body.text
            };

            const feedback = await FeedbackModel.findOne(
                {
                    _id: req.params.feedbackId,
                    'comments._id': req.params.commentId
                },
                'comments.text'
            );

            console.log(feedback);

            res.json({ feedback });
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ errorMessage: 'Server error' });
        }
    } */
}

module.exports = FeedbacksController;