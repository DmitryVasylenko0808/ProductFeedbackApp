const { body } = require('express-validator');
const UserModel = require('./models/User');

const signUpValidation = [
    body('name', 'Name is required').trim().notEmpty(),
    body('surname', 'Surname is required').trim().notEmpty(),
    body('login', 'Login must have more than 2 symbols').trim().isLength({ min: 2 }),
    body('login').custom(async value => {
        const user = await UserModel.find({ login: value });
        if (user.length !== 0) {
            throw new Error('This login is already exists');
        }

        return true;
    }),
    body('password', 'Password must have more than 7 symbols').trim().isLength({ min: 8 }),
    body('repeatPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Passwords don't match");
        }

        return true;
    }),
    body('role').custom(value => {
        const roles = ['User', 'Admin'];

        if(!roles.includes(value)) {
            throw new Error('Invalid role');
        }

        return true;
    })
]

const signInValidation = [
    body('login', 'Login is required').trim().notEmpty(),
    body('password', 'Password is required').trim().notEmpty()
] 

const feedbackValidation = [
    body('title', 'Title is required').trim().notEmpty(),
    body('detail', 'Detail is rquired').trim().notEmpty(),
    body('category', 'Category is required').trim().notEmpty(),
    body('category').custom(value => {
        const categories = ['UI', 'UX', 'Enhancement', 'Bug', 'Feature'];
        if (!categories.includes(value)) {
            throw new Error('Invalid category')
        }

        return true;
    }),
    body('status', 'Status is required').optional().trim().notEmpty(),
    body('status').optional().custom(value => {
        const categories = ['Planned', 'In-Progress', 'Live'];
        if (!categories.includes(value)) {
            throw new Error('Invalid status')
        }

        return true;
    })
]

const commentValidation = [
    body('text', 'Text are required').notEmpty(),
    body('text', 'Text must contain no more than 250 characters').isLength({ max: 250 })
]

module.exports = {
    signUpValidation,
    signInValidation,
    feedbackValidation,
    commentValidation
}