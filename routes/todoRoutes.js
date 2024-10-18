const express = require('express');
const auth = require('../middleware/auth');
const Todo = require('../models/todoModel');
const router = express.Router();


router.get('/', auth, async (req, res) => {
    try {
        const todos = await Todo.find({ userId: req.user.id });
        res.json(todos);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});


router.post('/', auth, async (req, res) => {
    const { title } = req.body;
    const newTodo = new Todo({ title, userId: req.user.id });

    try {
        await newTodo.save();
        res.json(newTodo);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Todo deleted' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});


router.put('/:id', auth, async (req, res) => {
    const { title } = req.body;

    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, { title }, { new: true });
        res.json(updatedTodo);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});


module.exports = router;
