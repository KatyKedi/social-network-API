const { User } = require('../models');

const userController = {
    getAllUsers(req, res) {
        User
            .find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    getUserById(req, res) {
        User    
            .findOne({ _id: req.params.userId })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },
    
    createUser(req, res) {
        User
            .create(req.body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },

    updateUser(req, res) {
        User
            .findOneAndUpdate(
                { _id: req.params.userId }, 
                req.body, 
                { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({message: 'No user found with this id!'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err))
    },

    deleteUser(req, res) {
        User
            .findOneAndDelete({ _id: req.params.userId })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },

    addFriend(req, res) {
        User
            .findOneAndUpdate(
                { _id: req.params.userId },
                { $push: { friends: req.body } },
                { new: true, runValidators: true }
            )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    removeFriend(req, res) {
        User
            .findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => res.json(err));
    }
};

module.exports = userController;