const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

class UsersController {
    static async signUp(req, res) {
        try {
            const { password } = req.body;
            const hash = await bcrypt.hash(password, 5);

            let avatarFile = {};
            if (req.files !== null) {
                avatarFile = req.files.avatar;
                await avatarFile.mv(`../server/public/${avatarFile.name}`);
            }
            else {
                avatarFile.name = 'nullavatar.jpg';
            }

            const doc = new UserModel({
                name: req.body.name,
                surname: req.body.surname,
                login: req.body.login,
                passwordHash: hash,
                role: req.body.role,
                avatar: avatarFile.name
            });
            await doc.save();

            res.json({ success: true, message: "Registration success" });
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ success: false, errorMessages: ["Server error"] });
        }
    }

    static async signIn(req, res) {
        try {
            const { login, password } = req.body;

            const user = await UserModel.findOne({ login });
            if (!user) {
                return res.status(404).json({ errorMessages: ["User is not found"] });
            }

            const isValidPass = await bcrypt.compare(password, user._doc.passwordHash);
            if (!isValidPass) {
                return res.status(400).json({ errorMessages: ["Invalid login or password"] });
            }

            const token = jwt.sign(
                {
                    _id: user._doc._id,
                    role: user._doc.role
                },
                config.secretKey,
                {
                    expiresIn: '24h'
                }
            );

            const { passwordHash, ...userData } = user._doc;

            res.json({ success: true, ...userData, token });
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ success: false, errorMessages: ["Server error"] });
        }
    }

    static async getMe(req, res) {
        try {
            const user = await UserModel.findById(req.userId);
            if (!user) {
                return res.status(404).json({ errorMessage: "User is not found" });
            }

            const { passwordHash, ...userData } = user._doc;  

            res.json({ ...userData });
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ errorMessage: "Server error" });
        }
    }
}

module.exports = UsersController;