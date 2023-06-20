const jwt = require('jsonwebtoken');
const config = require('../config');
const UserModel = require('../models/User');

const checkAuth = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];

    if (token) {
        try {
            const decoded = jwt.verify(token, config.secretKey);
            req.userId = decoded._id;
            req.userRole = decoded.role;

            next();
        }
        catch (err) {
            return res.status(403).json({ errorMessages: ['Access denied'] });
        }
    }
    else {
        return res.status(403).json({ errorMessages: ['Access denied'] });
    }
}

const checkAdmin = (req, res, next) => {
    if (req.userRole !== 'Admin') {
        return res.status(403).json({ errorMessages: ['You are not admin'] });
    }

    next();
}

const checkUpvoted = async (req, res, next) => {
    try {
        const feedback = await UserModel.findOne(
            {
                _id: req.userId,
                upvotedFeedbacks: { 
                    $elemMatch: { feedback_id: req.params.id } 
                }
            }
        );

        if (feedback) {
            return res.status(400).json({ errorMessages: ['This feedback is already upvoted'] });
        }

        console.log(feedback);
        next();
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ errorMessages: ['Server error'] });
    }
}

module.exports = {
    checkAuth,
    checkAdmin,
    checkUpvoted
}