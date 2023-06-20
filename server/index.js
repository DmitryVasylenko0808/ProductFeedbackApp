const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config');

const UsersController = require('./controllers/UsersController');
const FeedbacksController = require('./controllers/FeedbacksController');
const { signUpValidation, signInValidation, feedbackValidation, commentValidation } = require('./validations');
const handleValidationErrors = require('./utils/handleValidationErrors');
const { checkAuth, checkAdmin, checkUpvoted } = require('./utils/check');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/static', express.static('public'));
app.use(fileUpload());

app.post('/auth/register', signUpValidation, handleValidationErrors, UsersController.signUp);
app.post('/auth/signin', signInValidation, handleValidationErrors, UsersController.signIn);
app.get('/auth/me', checkAuth, UsersController.getMe);

app.get('/feedbacks/:id', FeedbacksController.getOne);
app.get('/feedbacks/filter/:category/sort/:order', FeedbacksController.getAll);
app.patch('/feedbacks/upvote/:id', checkAuth, checkUpvoted, FeedbacksController.upvote);
app.post('/feedbacks', checkAuth, checkAdmin, feedbackValidation, handleValidationErrors, FeedbacksController.add);
app.patch('/feedbacks/:id', checkAuth, checkAdmin, feedbackValidation, handleValidationErrors, FeedbacksController.edit);

app.patch('/feedbacks/comments/:id', checkAuth, commentValidation, handleValidationErrors, FeedbacksController.postComment);
/* app.patch('/feedbacks/comments/reply/:feedbackId/:commentId', checkAuth, commentValidation, handleValidationErrors, FeedbacksController.replyComment); */

const main = async () => {
    try {
        await mongoose.connect(config.dbUrl);
        console.log('DB OK');
        app.listen(config.PORT, () => {
            console.log('Server OK');
        });
    }
    catch (err) {
        console.log(err);
    }
}

main();