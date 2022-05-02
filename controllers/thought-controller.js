const { Thought, User } = require('../models');

const thoughtController = {
    getAllThoughts(req, res) {
        Thought
            .find({})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    getThoughtById(req, res) {
        Thought    
            .findOne({ _id: req.params.thoughtId })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    addThought(req, res) {
        Thought
            .create(req.body)
            .then((dbThoughtData) => {
                User.findOneAndUpdate(
                    { username: req.body.username },
                    { $push: { thoughts: dbThoughtData._id } },
                    { new: true }
                )
                .then(dbUserData => {
                    if (!dbUserData) {
                        res.status(404).json({ message: 'No user found with this username!' });
                        return;
                    }
                })
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

    updateThought(req, res) {
        Thought
            .findOneAndUpdate(
                { _id: req.params.thoughtId }, 
                req.body, 
                { new: true, runValidators: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({message: 'No thought found with this id!'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err))
    },

    removeThought(req, res) {
        Thought
            .findOneAndDelete({ _id: req.params.thoughtId })
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(404).json({ message: 'No thought with this id!' });
                }
                return User.findOneAndUpdate(
                    { username: deletedThought.username },
                    { $pull: { thoughts: deletedThought.thoughtId } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this username!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId }, 
            { $push: { reactions: req.body } }, 
            { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },

    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { _id: req.params.reactionId } } },
            { new: true }
        )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    }
};

module.exports = thoughtController;